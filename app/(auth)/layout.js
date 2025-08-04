const AuthLayout = ({ children }) => {
  return <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-emerald-900/10 dark:to-teal-900/10 flex items-center justify-center p-4">
  {/* Background Elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 rounded-full organic-blob animate-pulse"></div>
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full organic-blob animate-pulse delay-1000"></div>
  </div >
  <div>
    {children}
    <div className="border border-gray-200 p-4 rounded-lg ">
      <h1>sample login credentials for better ui:</h1>
   
      email: mendiscleo@gmail.com
      <br />
      password: mendiscleo
      
    </div>
    </div>
    
    
    </div>;
};

export default AuthLayout;
