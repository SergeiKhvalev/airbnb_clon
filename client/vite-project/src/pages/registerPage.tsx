import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios"

export default function RegisterPage(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function registerUser(ev){// that function sent post request from UI part of app to /login endpoint of the backend app
        ev.preventDefault();
        try{
            await axios.post('/register', {
                name,
                email,
                password
            });
            alert("Registration successful. Now you can login  ");
        }
        catch(e){
            alert("Registration failed. Please try again later");
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}> {/* that onSubmit* send axios api request to our back_end endpoint /test */}
                    {/*lines below we connect* we add endpoin for API to connect backend and frontend. Basicaly we send API request from front end to back end express app*/}
                    <input type="text" placeholder='John Doe'
                           value={name}
                           onChange={ev =>setName(ev.target.value)}/>
                    <input type="text" placeholder='your@email.com'
                            value={email}
                           onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" placeholder='your password'
                            value={password}
                            onChange={ev =>setPassword(ev.target.value)}/>
                    <button className="primary"> Register </button>
                    <div className='text-center py-2 text-gray-500'> Already a member? <Link className='underline text-black' to={'/login'}> Login</Link>
                    </div>
                </form>
            </div>

        </div>

    )
    }