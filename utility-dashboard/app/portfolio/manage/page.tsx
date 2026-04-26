"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";
import PropertySelector, { PropertyData } from "@/components/PropertySelector";
import PropertyAddressFields from "@/components/PropertyAddressFields";
import PropertyActionButtons from "@/components/PropertyActionButtons";
import PropertyMetricsFields from "@/components/PropertyMetricsFields";
import MeterTypeCheckboxes from "@/components/MeterTypeCheckboxes";
import PropertyImageUploader from "@/components/PropertyImageUploader";
import { supabase } from "@/lib/supabase";

type PropertyFormData = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  propertyType: string;
  buildingSize: string;
  hours: string;
  workers: string;
  meters: {
    electricity: boolean;
    gas: boolean;
    water: boolean;
  };
  imageUrl: string;
};

function ManagePropertyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlId = searchParams.get("id");

  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [property, setProperty] = useState<PropertyFormData>({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    propertyType: "",
    buildingSize: "",
    hours: "",
    workers: "",
    meters: {
      electricity: false,
      gas: false,
      water: false,
    },
    imageUrl: "",
  });

  // FETCH PROPERTIES
  useEffect(() => {
    async function fetchProperties() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("properties")
        .select("*")
        .eq("user_id", user.id);

      if (data) {
        const formatted = data.map((prop) => ({
          id: prop.id.toString(),
          name: prop.property_address || "Unnamed Property",
          address: prop.property_address || "",
          propertyType: prop.primary_use_type || "",
          buildingSize: prop.building_size_sqft || "",
          hours: prop.weekly_operating_hours || "",
          workers: prop.number_of_workers || "",
        }));

        setProperties(formatted);

        if (urlId) setSelectedPropertyId(urlId);
      }

      setIsLoading(false);
    }

    fetchProperties();
  }, [urlId]);

  // LOAD PROPERTY + METERS
  useEffect(() => {
    async function loadProperty() {
      const active = properties.find(p => p.id === selectedPropertyId);

      if (!selectedPropertyId || !active) {
        setProperty({
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: "",
          propertyType: "",
          buildingSize: "",
          hours: "",
          workers: "",
          meters: {
            electricity: false,
            gas: false,
            water: false,
          },
          imageUrl: "",
        });
        return;
      }

      const parts = (active.address || "")
        .split(",")
        .map(p => p.trim())
        .filter(Boolean);

      // LOAD METERS FROM TABLE
      const { data: meterRows } = await supabase
        .from("meters")
        .select("meter_type")
        .eq("property_id", Number(active.id));

      const types = (meterRows || []).map((m) => m.meter_type);

      setProperty((prev) => ({
        ...prev,
        address1: parts[0] || "",
        address2: parts.length === 5 ? parts[1] : "",
        city: parts.length === 5 ? parts[2] : parts[1] || "",
        state: parts.length === 5 ? parts[3] : parts[2] || "",
        zip: parts.length === 5 ? parts[4] : parts[3] || "",
        propertyType: active.propertyType || "",
        buildingSize: active.buildingSize?.toString() || "",
        hours: active.hours?.toString() || "",
        workers: active.workers?.toString() || "",

        meters: {
          electricity: types.includes("electricity"),
          gas: types.includes("gas"),
          water: types.includes("water"),
        },
      }));
    }

    loadProperty();
  }, [selectedPropertyId, properties]);

  // SAVE PROPERTY + METERS
  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const toInt = (val: string) => {
      const num = parseInt(val);
      return isNaN(num) ? null : num;
    };

    const fullAddress = [
      property.address1,
      property.address2,
      property.city,
      property.state,
      property.zip,
    ]
      .filter(Boolean)
      .join(", ");

    // 1. SAVE PROPERTY
    const { data: saved, error } = await supabase
      .from("properties")
      .upsert({
        id: selectedPropertyId ? Number(selectedPropertyId) : undefined,
        user_id: user.id,
        property_address: fullAddress,
        primary_use_type: property.propertyType,
        building_size_sqft: toInt(property.buildingSize),
        weekly_operating_hours: toInt(property.hours),
        number_of_workers: toInt(property.workers),
        image_url: property.imageUrl,
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    const propertyId = saved.id;

    // 2. SAVE METERS (DELETE + INSERT)
    const selectedMeters = Object.entries(property.meters)
      .filter(([_, v]) => v)
      .map(([k]) => k);

    await supabase
      .from("meters")
      .delete()
      .eq("property_id", propertyId);

    if (selectedMeters.length > 0) {
      await supabase.from("meters").insert(
        selectedMeters.map((type) => ({
          property_id: propertyId,
          meter_type: type,
          unit: "kWh",
        }))
      );
    }

    router.push("/portfolio");
    router.refresh;
  };

  const handleDelete = async () => {
    if (!selectedPropertyId) return;

    const confirmDelete = confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return;

    const propertyId = Number(selectedPropertyId);

    // 1. Delete meters first
    const { error: meterError } = await supabase
      .from("meters")
      .delete()
      .eq("property_id", propertyId);

    if (meterError) {
      alert(meterError.message);
      return;
    }

    // 2. Delete property
    const { error: propertyError } = await supabase
      .from("properties")
      .delete()
      .eq("id", propertyId);

    if (propertyError) {
      alert(propertyError.message);
      return;
    }

    // 3. Reset UI
    setSelectedPropertyId(null);
    setProperties((prev) =>
      prev.filter((p) => p.id !== selectedPropertyId)
    );

    router.push("/portfolio");
    router.refresh();
  };

  const handleCancel = async () => {
    router.replace("/portfolio");
  };


  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-8">

      {isLoading ? (
        <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center">
          <p className="text-gray-500 font-medium">Loading your portfolio...</p>
        </div>
      ) : (
        <PropertySelector
          properties={properties}
          selectedId={selectedPropertyId}
          onSelect={setSelectedPropertyId}
        />
      )}

      <div className="border border-gray-400 rounded-3xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* ADDRESS */}
          <div className="flex flex-col gap-4">
            <PropertyAddressFields
              propertyData={property}
              onChange={(val: Partial<PropertyFormData>) =>
                setProperty((prev) => ({ ...prev, ...val }))
              }
            />
          </div>

          {/* METRICS */}
          <div className="flex flex-col gap-4">
            <PropertyMetricsFields
              propertyData={property}
              onChange={(val: Partial<PropertyFormData>) =>
                setProperty((prev) => ({ ...prev, ...val }))
              }
            />

            <MeterTypeCheckboxes
              value={property.meters}
              onChange={(meters) =>
                setProperty((prev) => ({ ...prev, meters }))
              }
            />
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-4 h-full">
            <PropertyActionButtons
              onSave={handleSave}
              onDelete={handleDelete}
              onCancel={handleCancel}
            />

            <PropertyImageUploader
              onFileSelect={(url) =>
                setProperty((prev) => ({ ...prev, imageUrl: url }))
              }
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ManagePropertyPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <DashboardHeader />
      <Suspense fallback={<div className="p-8">Loading...</div>}>
        <ManagePropertyContent />
      </Suspense>
    </main>
  );
}