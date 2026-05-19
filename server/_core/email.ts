import { TRPCError } from "@trpc/server";
import nodemailer from "nodemailer";
import { ENV } from "./env";

export type ContactEmailInput = {
  name: string;
  email: string;
  phone: string;
  studentNeeds?: string;
  interestedPackage?: string;
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const requireSmtpConfig = () => {
  if (!ENV.smtpUser || !ENV.smtpPass) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Gmail-afsendelse er ikke konfigureret. Sæt SMTP_USER og SMTP_PASS i miljøvariablerne.",
    });
  }
};

const formatContactText = (input: ContactEmailInput, source: string): string => {
  const studentNeeds = input.studentNeeds?.trim() || "Ikke specificeret";
  const interestedPackage = input.interestedPackage?.trim() || "Ikke specificeret";

  return `Ny henvendelse fra tutorsiden

Vigtig status:
- Kilde: ${source}
- Ønsket forløb: ${interestedPackage}
- Eleven/familien har beskrevet udfordringer: ${studentNeeds === "Ikke specificeret" ? "Nej" : "Ja"}
- Næste handling: Kontakt familien hurtigst muligt

Kontaktoplysninger:
- Navn: ${input.name}
- Email: ${input.email}
- Telefon: ${input.phone}

Beskrivelse af eleven og udfordringer:
${studentNeeds}

Interesse:
${interestedPackage}
`;
};

const formatContactHtml = (input: ContactEmailInput, source: string): string => {
  const studentNeeds = input.studentNeeds?.trim() || "Ikke specificeret";
  const interestedPackage = input.interestedPackage?.trim() || "Ikke specificeret";

  return `
    <h2>Ny henvendelse fra tutorsiden</h2>
    <h3>Vigtig status</h3>
    <ul>
      <li><strong>Kilde:</strong> ${escapeHtml(source)}</li>
      <li><strong>Ønsket forløb:</strong> ${escapeHtml(interestedPackage)}</li>
      <li><strong>Elevens udfordringer beskrevet:</strong> ${studentNeeds === "Ikke specificeret" ? "Nej" : "Ja"}</li>
      <li><strong>Næste handling:</strong> Kontakt familien hurtigst muligt</li>
    </ul>
    <h3>Kontaktoplysninger</h3>
    <ul>
      <li><strong>Navn:</strong> ${escapeHtml(input.name)}</li>
      <li><strong>Email:</strong> ${escapeHtml(input.email)}</li>
      <li><strong>Telefon:</strong> ${escapeHtml(input.phone)}</li>
    </ul>
    <h3>Beskrivelse af eleven og udfordringer</h3>
    <p>${escapeHtml(studentNeeds).replaceAll("\n", "<br />")}</p>
    <h3>Interesse</h3>
    <p>${escapeHtml(interestedPackage)}</p>
  `;
};

export async function sendContactEmail(
  input: ContactEmailInput,
  source = "Kontaktformular"
): Promise<void> {
  requireSmtpConfig();

  const transporter = nodemailer.createTransport({
    host: ENV.smtpHost,
    port: ENV.smtpPort,
    secure: ENV.smtpSecure,
    auth: {
      user: ENV.smtpUser,
      pass: ENV.smtpPass,
    },
  });

  const packageLabel = input.interestedPackage?.trim() || "ukendt forløb";

  await transporter.sendMail({
    from: `"Markus Tutorside" <${ENV.smtpUser}>`,
    to: ENV.contactToEmail,
    replyTo: input.email,
    subject: `Ny henvendelse: ${input.name} - ${packageLabel}`,
    text: formatContactText(input, source),
    html: formatContactHtml(input, source),
  });
}
