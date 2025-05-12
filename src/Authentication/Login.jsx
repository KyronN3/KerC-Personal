import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { ModalContext } from '../context.jsx'
import { useContext, useState } from "react"
import { auth, googleAuth } from "../config/firebase.jsx"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { ToastContainer, toast } from "react-toastify"


export default function LoginForm() {

  const navigateHome = useNavigate();
  const { modalSignupOpen, setModalSignupOpen, setLogin } = useContext(ModalContext);
  const [user, setUser] = useState(
    {
      email: null,
      password: null
    });


  const createAccountModal = () => {
    setModalSignupOpen(!modalSignupOpen);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      setLogin(true);
      navigateHome('/')
      toast.success("Login Successfully", {
        position: 'bottom-center',
        hideProgressBar: true,
        closeButton: false,
        autoClose: 3000,
        pauseOnFocusLoss: false,
        style: {
          top: '60px',
          border: '1px solid black',
          width: 'auto',
          height: '60px'
        }
      });
    } catch (error) {
      toast.error("Wrong email or password, please try Again!", {
        position: 'bottom-center',
        hideProgressBar: true,
        closeButton: false,
        autoClose: 3000,
        pauseOnFocusLoss: false,
        style: {
          top: '60px',
          border: '1px solid black',
          width: 'auto',
          height: '60px'
        }
      });
      console.error(error)
    }
  }

  const authGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
      setLogin(true);
      navigateHome('/');
      toast.success("Login Successfully", {
        position: 'bottom-right',
      });
    } catch (err) {
      console.error(err);
    }

  }

  const onChangedEmail = (e) => {
    setUser(userPrev => ({ ...userPrev, email: e.target.value }))
  }

  const onChangedPassword = (e) => {
    setUser(userPrev => ({ ...userPrev, password: e.target.value }))
  }

  return (
    <div
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6")}
      style={{
        borderRadius: "16px",
        position: 'fixed',
        marginTop: '150px',
        left: '47%',
        transform: 'translate(-50%, -50%)',
        width: 350,
      }}
    >
      <Card style={{ backgroundColor: "#e3f2fd" }}>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription style={{ color: "black" }}>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={onChangedEmail}
                  placeholder="m@example.com"
                  style={{ borderColor: "black", backgroundColor: "white" }}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" onChange={onChangedPassword} type="password" style={{ borderColor: "black", backgroundColor: "white" }} placeholder="******" required />
              </div>
              <Button type="submit" className="w-full" style={{ cursor: "pointer" }}>
                Login
              </Button>
              <Button variant="outline" onClick={authGoogle} className="w-full" style={{ cursor: "pointer" }}>
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to='/login/signup' onClick={createAccountModal} className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  )
}
