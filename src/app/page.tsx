import { AppShellContent } from "@/components/layout";

export default function Home() {
  return (
    <AppShellContent className="space-y-6">
      <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          RheumaLens workspace foundation
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          The global layout, reusable components, state layer, and design system are now in place for the upcoming product experience.
        </p>
      </section>
    </AppShellContent>
  );
}
