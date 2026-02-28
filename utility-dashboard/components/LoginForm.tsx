import Image from "next/image";

export default function LoginForm() {
    return(
        <form className="w-full max-w-md">

            <div className="relative flex space-x-3">
                <Image
                    src="/images/UsernameIcon.png"
                    alt="Username Icon"
                    width={30}
                    height={30}
                    className="absolute inset-y-2 left-3 flex items-center 
                    pointer-events-none"
                />
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder="Username" 
                    className="w-full rounded-full border  border-gray-700 px-5 py-3
                    text-md text-gray-500 focus:outline-none focus:ring-2 font-inter
                    focus:ring-blue-800 pl-12" 
                />
            </div>

            <div className="relative flex space-x-3 mt-5">
                <Image
                    src="/images/PasswordIcon.png"
                    alt="Password Icon"
                    width={30}
                    height={30}
                    className="absolute inset-y-1 left-3 flex items-center 
                    pointer-events-none"
                />

                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Password" 
                    className="w-full  px-5 py-3 border border-gray-700
                    rounded-full text-md text-gray-500 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 font-inter pl-12
                    " 
                />
            </div>

            <div className="flex flex-col mt-1 mb-5 ml-5">
                <a 
                    href="#" 
                    className="text-md text-blue-700 hover:underline font-inter"
                >Forgot Password?</a>
            </div>

            <button 
                type="submit" 
                className="
                w-full bg-[#002A84] hover:bg-blue-600 
                text-white font-bold py-2 px-4 rounded-full 
                shadow-md hover:bg-blue-900 transition duration-300"
            >SIGN IN</button>


            <div className="flex justify-center text-center space-x-3 mt-5">
                <p className="text-md text-gray-700 font-inter">
                    Don't have an account?  
                </p>
                <a 
                    href="#" 
                    className="text-md text-blue-800 hover:underline font-inter
                    font-extrabold"
                >Sign Up Now</a>
            </div>
        </form>

        
    );
}