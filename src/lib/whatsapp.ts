export const RUDRA_WHATSAPP_NUMBER = "+91 81257 41014";
export const RUDRA_WHATSAPP_RAW = "918125741014";
export const RUDRA_WHATSAPP_BASE_URL = `https://wa.me/${RUDRA_WHATSAPP_RAW}`;
export const RUDRA_YOUTUBE_URL = "https://www.youtube.com/@RudrapropertiesDubai";
export const RUDRA_INSTAGRAM_URL = "https://www.instagram.com/rudrapropertiesdubai/";
export const RUDRA_FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61595585204977";

export type WhatsAppEnquiryType =
  | "general"
  | "buy"
  | "sell"
  | "investment"
  | "management"
  | "consultation"
  | "team"
  | "property";

export interface WhatsAppOptions {
  type?: WhatsAppEnquiryType;
  propertyName?: string;
  propertyLocation?: string;
  teamMemberName?: string;
  customMessage?: string;
  formData?: {
    name?: string;
    phone?: string;
    enquiryType?: string;
    budget?: string;
    location?: string;
    message?: string;
  };
}

export function getWhatsAppUrl(options?: WhatsAppOptions | WhatsAppEnquiryType): string {
  if (!options) {
    return `${RUDRA_WHATSAPP_BASE_URL}?text=${encodeURIComponent(
      "Hello Rudra Properties, I would like to know more about your Dubai real estate consultancy services. Please contact me."
    )}`;
  }

  const opts: WhatsAppOptions = typeof options === "string" ? { type: options } : options;

  let message = "";

  if (opts.customMessage) {
    message = opts.customMessage;
  } else if (opts.formData) {
    const parts = [
      `Hello Rudra Properties, I submitted an enquiry via your website:`,
      opts.formData.name ? `• Name: ${opts.formData.name}` : "",
      opts.formData.phone ? `• Phone: ${opts.formData.phone}` : "",
      opts.formData.enquiryType ? `• Interest: ${opts.formData.enquiryType}` : "",
      opts.formData.budget ? `• Budget: ${opts.formData.budget}` : "",
      opts.formData.location ? `• Preferred Location: ${opts.formData.location}` : "",
      opts.formData.message ? `• Note: ${opts.formData.message}` : "",
      `Please contact me with more information.`,
    ].filter(Boolean);
    message = parts.join("\n");
  } else {
    switch (opts.type) {
      case "buy":
        message =
          "Hello Rudra Properties, I am interested in buying a property in Dubai. Please help me explore suitable options.";
        break;
      case "sell":
        message =
          "Hello Rudra Properties, I would like assistance with selling my property in Dubai. Please let me know the next steps.";
      case "investment":
        message =
          "Hello Rudra Properties, I am interested in Dubai real estate investment opportunities. I would like to discuss my investment goals and suitable property options.";
        break;
      case "management":
        message =
          "Hello Rudra Properties, I would like to enquire about property management services in Dubai. Please share the available services and next steps.";
        break;
      case "consultation":
        message =
          "Hello Rudra Properties, I would like to schedule a consultation regarding Dubai real estate. Please let me know the available options.";
        break;
      case "team":
        if (opts.teamMemberName) {
          message = `Hello Rudra Properties, I would like to connect with ${opts.teamMemberName} regarding a Dubai property consultation. Please connect me.`;
        } else {
          message =
            "Hello Rudra Properties, I would like to speak with your team about a property enquiry. Please connect me with the appropriate person.";
        }
        break;
      case "property":
        if (opts.propertyName && opts.propertyLocation) {
          message = `Hello Rudra Properties, I am interested in learning more about ${opts.propertyName} in ${opts.propertyLocation}. Please share the available details.`;
        } else if (opts.propertyName) {
          message = `Hello Rudra Properties, I am interested in learning more about ${opts.propertyName}. Please share the available details.`;
        } else {
          message =
            "Hello Rudra Properties, I am interested in learning more about your featured Dubai properties. Please share the available details.";
        }
        break;
      case "general":
      default:
        message =
          "Hello Rudra Properties, I would like to know more about your Dubai real estate consultancy services. Please contact me.";
        break;
    }
  }

  return `${RUDRA_WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

