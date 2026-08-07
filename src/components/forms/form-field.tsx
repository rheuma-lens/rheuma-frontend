import { forwardRef } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  error?: string;
  asTextarea?: boolean;
}

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, description, error, className, asTextarea = false, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-2">
        <Label htmlFor={inputId}>{label}</Label>
        {asTextarea ? (
          <Textarea id={inputId} ref={ref as React.ForwardedRef<HTMLTextAreaElement>} className={cn(className)} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
        ) : (
          <Input id={inputId} ref={ref as React.ForwardedRef<HTMLInputElement>} className={cn(className)} {...props} />
        )}
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </div>
    );
  },
);

FormField.displayName = "FormField";
