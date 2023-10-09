import { useCallback, useEffect, useState } from 'react'

function App() {

  const [password, setPassword] = useState("");
  const [numbers, setNumbers] = useState(false);
  const [specialchar, setSpecialchar] = useState(false);
  const [length, setLength] = useState(10);

  const passwordGenerator = useCallback(()=>{

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
    if(numbers)
    {
      str += "1234567890";
    }

    if(specialchar)
    {
      str += "!@#$%^&*()_";
    }

    let result = "";
    let strLength = str.length;
    for (let i = 0; i < length; i++) {
      let charPosition = Math.floor(Math.random() * strLength + 1 );  
      result += str.charAt(charPosition);
    }

    setPassword(result)
  },[numbers, specialchar, length]);

  useEffect(()=>{
    passwordGenerator();
  },[numbers, specialchar, length, passwordGenerator]);

  const copyPassword = () =>{
    let pass = document.getElementById("passwordField").value;
    navigator.clipboard.writeText(pass);
  }

  return (
    <>
      <div className='container mx-auto h-screen flex justify-center items-center flex-col bg-[url("https://images.pexels.com/photos/3946013/pexels-photo-3946013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")] bg-no-repeat bg-cover'>
        <h1 className='text-center text-3xl font-bold mb-4 text-orange-600 bg-gray-800 p-4 rounded-xl'>Password Geneator</h1>
        <form action="" className='p-6 bg-gray-800 rounded-xl text-orange-600 font-semibold'>
          <div className='container mx-auto my-4 flex'>

            <input type="text" value={password} className='w-full p-2 rounded-lg' readOnly id='passwordField'/>
            <input type="button" value="Copy" className='mx-2 bg-orange-600 text-white p-3 rounded-lg cursor-pointer' onClick={copyPassword}/> 

          </div>
          <div className='container mx-auto'>

            <input type="range" id='lengthValue' min={10} max={30} className='mr-1' onChange={(e)=>{setLength(e.target.value)}} value={length}/>
            <label htmlFor='lengthValue' className='mr-2'>Length {length}</label>

            <input type="checkbox" onChange={()=>{setNumbers((prev)=>!prev)}} defaultChecked={numbers}/>
            <label htmlFor='numberAllowed' className='mr-2'>Numbers</label>

            <input type="checkbox" onChange={()=>{setSpecialchar((prev)=>!prev)}} defaultChecked={specialchar}/>
            <label htmlFor='charAllowed'>Special Character</label>

          </div>
        </form>
      </div>
    </>
  )
}

export default App
