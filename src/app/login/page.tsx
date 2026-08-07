"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";

import { useAuth } from "@/hooks/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema, type LoginValues } from "@/lib/validation/login";

export default function LoginPage() {
  const auth = useAuth();
  const methods = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (values: LoginValues) => {
    try {
      await auth.signIn({ email: values.email, password: values.password });
      toast.success("Signed in successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please check your credentials and try again.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45 } }}
          className="w-full rounded-[2rem] border border-slate-200/70 bg-white/95 p-6 shadow-[0_40px_120px_-45px_rgb(15,23,42,0.25)] backdrop-blur-xl transition-colors dark:border-slate-800/80 dark:bg-slate-900/90 md:p-10 lg:max-w-3xl"
        >
          <AuthLayout />

          <div className="mt-8 grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
                Secure access for care teams
              </h1>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
                Sign in to RheumaLens to continue reviewing patient data, care summaries, and clinical workflows with confidence.
              </p>
            </div>
            <AuthCard>
              <Form {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {auth.error && (
                    <Alert variant="destructive">
                      <AlertTitle>Authentication error</AlertTitle>
                      <AlertDescription>{auth.error.message}</AlertDescription>
                    </Alert>
                  )}

                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <Input
                          type="email"
                          autoComplete="email"
                          placeholder="name@hospital.org"
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Enter your secure password"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((value) => !value)}
                            className="absolute inset-y-0 right-2 inline-flex items-center rounded-md px-3 text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between gap-4">
                          <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                id="rememberMe"
                              />
                            <span>Remember me</span>
                          </label>
                          <ForgotPasswordLink />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <LoginButton isLoading={isSubmitting} />
                    <Divider />
                    <Footer />
                  </div>
                </form>
              </Form>
            </AuthCard>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

function AuthLayout() {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6 text-slate-900 shadow-sm dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-100">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700 dark:text-sky-300">
        RheumaLens Secure Login
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        Healthcare-grade sign-in with clinical security, team workflows, and fast access to the information you need.
      </p>
    </div>
  );
}

function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-slate-950/95 p-6 shadow-2xl shadow-slate-900/10 transition-colors dark:border-slate-700/80 dark:bg-slate-900/95">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Access portal</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Sign in to your account</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Enter your hospital credentials and securely manage patient triage, referrals, and specialist care.
        </p>
      </div>
      {children}
    </div>
  );
}

function LoginButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Signing in…
        </span>
      ) : (
        "Sign in"
      )}
    </Button>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 text-xs uppercase text-slate-500 dark:text-slate-400">
      <span className="h-px flex-1 bg-slate-200/70 dark:bg-slate-700/80" />
      <span>Secure access</span>
      <span className="h-px flex-1 bg-slate-200/70 dark:bg-slate-700/80" />
    </div>
  );
}

function ForgotPasswordLink() {
  return (
    <Link
      href="/forgot-password"
      className="text-sm font-medium text-sky-500 transition hover:text-sky-400 dark:text-sky-300 dark:hover:text-sky-200"
    >
      Forgot password?
    </Link>
  );
}

function Footer() {
  return (
    <p className="text-center text-sm leading-6 text-slate-400">
      Trusted by clinicians for secure patient collaboration, approved for privacy-first care pathways.
    </p>
  );
}
