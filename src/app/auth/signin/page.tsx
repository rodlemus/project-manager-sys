import { signinAction } from "@/app/auth/actions/auth/signin.action";
import CustomButton from "@/custom-components/Button/CustomButton";
import CustomLabelInput from "@/custom-components/CustomLabelInput/CustomLabelInput";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h1>
        <form className="space-y-4" action={signinAction}>
          <CustomLabelInput
            label="Correo Electrónico"
            type="email"
            name="email"
            placeholder="Correo Electrónico"
          />
          <CustomLabelInput
            label="Contraseña"
            type="password"
            name="password"
            placeholder="********"
          />
          <div className="flex justify-between items-center">
            <label className="flex items-center text-sm text-gray-800">
              <input type="checkbox" className="mr-2" />
              Recuérdame
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <CustomButton width="w-full" text="Iniciar Sesión" type="submit" />
        </form>
        <p className="mt-4 text-center text-sm text-gray-800">
          ¿No tienes una cuenta?{" "}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}
