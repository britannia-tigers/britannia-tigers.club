import axios from "axios"
import { ContactFormDataProps } from "../components/ContactForm"




export async function sendEnquiries(formData: Partial<ContactFormDataProps>) {
  const res = await axios.post('/api/messaging/enquiry-form', formData)
  return res
}
