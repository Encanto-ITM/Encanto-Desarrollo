import SignInForm from '../Components/UI/SignInForm'
import SignUpForm from '../Components/UI/SignUpForm'

export default function Login () {
    return (
        <div className="bg-gray-200">
            <div className="flex justify-center items-center h-screen">
              {/*<SignUpForm />*/}
              <SignInForm />
            </div>
        </div>
    )
}