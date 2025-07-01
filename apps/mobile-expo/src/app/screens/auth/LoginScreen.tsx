// src/app/screens/auth/LoginScreen.tsx
import { useNavigation } from "@react-navigation/native";
import { Button, Input, Typography, YStack } from "@glibs/ui";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

// Import dari react-hook-form
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Import authService
import { authService } from "../../services/auth.service";
// import { ApiResponseError } from '../../types/auth'; // Import tipe error API
import { useAuth } from "../../hooks/useAuth"; // Hook useAuth dari AuthContext

import { loginSchema, LoginInput } from "@glibs/types";
import { ZodError } from "zod";
import { AxiosError } from "axios";
import { ApiError } from "../../utils/apiError";

// Infer tipe dari skema untuk penggunaan TypeScript

export function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { login } = useAuth(); // Ambil fungsi login dari AuthContext

  // === 2. Inisialisasi useForm dengan zodResolver ===
  const {
    control, // Untuk mengontrol input
    handleSubmit, // Fungsi untuk menangani submit form
    formState: { errors, isSubmitting }, // State form: errors dan loading state
    setError, // Fungsi untuk mengatur error secara manual (misal: dari API)
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema), // Menggunakan Zod untuk validasi
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      console.log("Form submitted:", data);
      // Panggil authService.login yang akan berkomunikasi dengan backend
      const authResponse = await authService.login(data);
  console.log('authResponse :', authResponse);
      if (!authResponse.success || !authResponse.data) {
        throw new Error(authResponse.message);
      }

      // Simpan token dan info user ke AuthContext (dan AsyncStorage)
      await login(authResponse.data.token, authResponse.data.user);
      console.log('Login successful, navigating to Home');
      // Navigasi setelah sukses login
      navigation.navigate("Home"); // Navigasi ke MainStack setelah login sukses

    } catch (err: ZodError | AxiosError | Error | ApiError ) {
      console.error("Login API Error (Catch Block):", err);
      setError("root.serverError", {
        type: "server",
        message: err.message || "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <YStack
      flex={1}
      jc={"space-between"}
      p={"$spacing-md"}
      backgroundColor={"#6965F2"}
    >
      <YStack ai={"center"} gap={"$spacing-lg"}>
        <Typography variant="$body-18">Sign in</Typography>
        <Typography>Continue your vocabulary journey</Typography>
      </YStack>

      <YStack gap={"$spacing-lg"}>
        {/* === 3. Gunakan Controller untuk Input Email === */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
              // Asumsi @glibs/ui Input bisa menerima error prop
              error={errors.email?.message}
            />
          )}
        />
        {/* Tampilkan pesan error validasi frontend */}
        {errors.email && (
          <Typography color="red" variant="$body-14" mt={"-$spacing-sm"}>
            {errors.email.message}
          </Typography>
        )}

        {/* === 4. Gunakan Controller untuk Input Password === */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry // Untuk menyembunyikan input password
              // Asumsi @glibs/ui Input bisa menerima error prop
              error={errors.password?.message}
            />
          )}
        />
        {errors.password && (
          <Typography color="red" variant="$body-14" mt={"-$spacing-sm"}>
            {errors.password.message}
          </Typography>
        )}

        {/* Tampilkan error dari server (misal: "Invalid credentials") */}
        {errors.root?.serverError && (
          <Typography color="red" variant="$body-14" mt={"-$spacing-sm"}>
            {errors.root.serverError.message}
          </Typography>
        )}
      </YStack>

      {/* === 5. Tombol Login === */}
      <Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
        <Typography>{isSubmitting ? "Logging In..." : "Login"}</Typography>
      </Button>
    </YStack>
  );
}

export default LoginScreen;
