


export interface EmailData {
  name?: string
  email: string
}

export interface SendMailProps {
  to: EmailData | EmailData[],
  from: string,
  dynamicTemplateData: { [key: string]: any; },
  templateId: string
}