import CustomButton from "@/custom-components/Button/CustomButton";
import CustomLabelInput from "@/custom-components/CustomLabelInput/CustomLabelInput";

export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Hola mundo desde el Signup
        </h1>
        <form className="space-y-4">
          <CustomLabelInput
            label="Nombre"
            type="text"
            name="name"
            placeholder="Jhon Doe"
          />
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
          <CustomLabelInput
            label="Confirmar Contraseña"
            type="password"
            name="confirmPassword"
            placeholder="********"
          />
          <CustomButton text="Registrarse" type="button" />
        </form>
      </div>
    </div>
  );
}
