import {React,useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import './Screens.css'


function SignUp() {
    const navigate=useNavigate()
    const [credentials,setcredentials]=useState({name:"",email:"",password:"",geolocation:""})
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/createUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            location: credentials.geolocation,
          }),
        });
        const json = await response.json(); // Parse the response as JSON
        console.log(json);
        navigate('/login')

        if (!json.success) {
          alert("Enter valid credentials");
          navigate('/createUser')
        }
      };
      


    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    return (
      <div className='top'> 
        <div className='container forms p-3 '>
            <form onSubmit={handleSubmit}>
            <h2 className='text-center text-success'>Sign up</h2>
            <div className="form-group">
                    <label htmlFor="name" className='text-success'>Name</label>
                    <input type="text" autoComplete="off" className="form-control mt-2" 
                    name='name' value={credentials.name} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className='mt-3 text-success'>Email address</label>
                    <input type="email" autoComplete="off" className="form-control mt-2" id="exampleInputEmail1" 
                     name='email' value={credentials.email} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className='mt-3 text-success'>Password</label>
                    <input type="password" autoComplete="off" className="form-control mt-2" id="exampleInputPassword1"
                      name='password' value={credentials.password} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className='mt-3 text-success'>Adress</label>
                    <input type="text" autoComplete="off" className="form-control mt-2" 
                    name='geolocation' value={credentials.geolocation} onChange={onChange}/>
                </div>
                
                <button type="submit" className="m-3 btn btn-primary">Submit</button>
            <Link to={'/login'} className='m-3 btn btn-danger'>Already a user</Link>
                </form>
        </div>
        </div>
    )
}

export default SignUp