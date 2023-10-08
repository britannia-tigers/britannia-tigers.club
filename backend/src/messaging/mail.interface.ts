


export interface EmailData {
  name?: string
  email: string
}

export interface SendMailProps {
  to: EmailData | EmailData[],
  bcc: EmailData | EmailData[],
  cc?: EmailData | EmailData[],
  from: string,
  dynamicTemplateData: { [key: string]: any; },
  templateId: string
}