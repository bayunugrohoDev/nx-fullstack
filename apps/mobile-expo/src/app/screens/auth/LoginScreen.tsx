// src/app/screens/auth/LoginScreen.tsx
import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Button, Input, Typography, YStack } from "@glibs/ui";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

// Import dari react-hook-form
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; // Untuk skema validasi frontend

// Import authService
import { authService } from '../../services/auth.service';
// import { ApiResponseError } from '../../types/auth'; // Import tipe error API
import { useAuth } from '../../hooks/useAuth'; // Hook useAuth dari AuthContext

// === 1. Definisikan Skema Validasi Frontend dengan Zod ===
// Skema ini harus cocok dengan loginSchema di backend Anda
const loginFormSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

// Infer tipe dari skema untuk penggunaan TypeScript
type LoginFormInputs = z.infer<typeof loginFormSchema>;

export function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { login: authContextLogin } = useAuth(); // Ambil fungsi login dari AuthContext

  // === 2. Inisialisasi useForm dengan zodResolver ===
  const {
    control, // Untuk mengontrol input
    handleSubmit, // Fungsi untuk menangani submit form
    formState: { errors, isSubmitting }, // State form: errors dan loading state
    setError // Fungsi untuk mengatur error secara manual (misal: dari API)
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema), // Menggunakan Zod untuk validasi
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // Panggil authService.login yang akan berkomunikasi dengan backend
      const authResponse = await authService.login(data);

      // Simpan token dan info user ke AuthContext (dan AsyncStorage)
      // Asumsi fungsi login di useAuth Anda menerima token dan user data
      await authContextLogin(authResponse.token, authResponse.user);

      // Navigasi setelah sukses login
      navigation.navigate("Main"); // Navigasi ke MainStack setelah login sukses

    } catch (err: any) {
      console.error('Login API Error:', err);
      // Tangani error dari API
      if (err && typeof err === 'object' && 'message' in err) {
          const apiError = err as ApiResponseError;
          // Set error form berdasarkan pesan dari API
          if (apiError.errors && apiError.errors.length > 0) {
              // Jika ada Zod errors dari backend
              apiError.errors.forEach((e: any) => {
                  if (e.path && e.path[0]) {
                      setError(e.path[0] as keyof LoginFormInputs, {
                          type: 'server',
                          message: e.message,
                      });
                  }
              });
          } else {
              // Jika error umum dari API
              setError('root.serverError', {
                  type: 'server',
                  message: apiError.message,
              });
          }
      } else {
          // Tangani error yang tidak terduga
          setError('root.serverError', {
              type: 'server',
              message: 'An unexpected error occurred. Please try again.',
          });
      }
    }
  };

  return (
    <YStack flex={1} jc={"space-between"} p={"$spacing-md"} backgroundColor={'#6965F2'}>
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
        <Typography>
          {isSubmitting ? 'Logging In...' : 'Login'}
        </Typography>
      </Button>
    </YStack>
  );
}

export default LoginScreen;