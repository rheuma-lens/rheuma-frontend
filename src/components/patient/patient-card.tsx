import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Patient } from "@/types";

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard = ({ patient }: PatientCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {patient.firstName} {patient.lastName}
        </CardTitle>
        <CardDescription>Patient record placeholder</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>MRN: {patient.medicalRecordNumber ?? "—"}</p>
        <p>Gender: {patient.gender ?? "—"}</p>
        <p>Created: {patient.createdAt}</p>
      </CardContent>
    </Card>
  );
};
