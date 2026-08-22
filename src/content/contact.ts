export const contactContent = {
  hero: {
    title: "Contact Us",
    subtitle:
      "Get in touch with our team for inquiries about products, partnerships, or any solar-related questions.",
    backgroundImage: "/assets/contact/contact-hero.webp",
  },

  form: {
    title: "Send Us a Message",
    subtitle: "Fill out the form below and our team will get back to you within 24 hours.",
    fields: {
      name: { label: "Full Name", placeholder: "Enter your full name" },
      email: { label: "Email Address", placeholder: "Enter your email address" },
      phone: { label: "Phone Number", placeholder: "Enter your phone number" },
      company: { label: "Company Name", placeholder: "Enter your company name" },
      subject: {
        label: "Subject",
        placeholder: "Select a subject",
        options: [
          "Product Inquiry",
          "Partnership Opportunity",
          "Technical Support",
          "Careers",
          "Media Inquiry",
          "Other",
        ],
      },
      message: { label: "Message", placeholder: "Tell us how we can help you" },
    },
    submitLabel: "Send Message",
    successMessage: "Thank you for reaching out! Our team will get back to you within 24 hours.",
    errorMessage: "Something went wrong. Please try again or contact us directly.",
  },

  contactInfo: {
    title: "Contact Information",
    items: [
      {
        icon: "MapPin",
        label: "Address",
        value: "Adani Corporate House, Shantigram, S.G. Highway, Ahmedabad, Gujarat 382421, India",
      },
      {
        icon: "Phone",
        label: "Phone",
        value: "+91-79-2555 5555",
      },
      {
        icon: "Mail",
        label: "Email",
        value: "info@adanisolar.com",
      },
      {
        icon: "Clock",
        label: "Business Hours",
        value: "Mon - Fri: 9:00 AM - 6:00 PM IST",
      },
    ],
  },

  visitUs: {
    title: "Visit Our Mundra Facility",
    subtitle:
      "Our state-of-the-art 10 GW integrated solar PV manufacturing facility is located at Mundra, Gujarat — India's largest single-location solar plant.",
    addressLines: [
      "Adani Solar Manufacturing Facility",
      "Mundra Special Economic Zone (SEZ)",
      "Mundra, Kutch District",
      "Gujarat 370421, India",
    ],
    coordinatesLabel: "Lat 22.83°N, Long 69.72°E",
    hours: [
      { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
      { day: "Saturday", time: "9:00 AM – 1:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    responseCommitment: "We respond within 24 hours",
    responseDetail:
      "All enquiries submitted through this form receive a personalised reply from our sales team within one business day.",
  },

  socialConnect: {
    title: "Connect with Us",
    subtitle:
      "Follow Adani Solar for the latest news, milestones and insights from the world of solar manufacturing.",
    links: [
      { label: "LinkedIn", icon: "Linkedin", url: "https://www.linkedin.com/company/adani-solar" },
      { label: "Twitter / X", icon: "Twitter", url: "https://x.com/AdaniSolar" },
      { label: "YouTube", icon: "Youtube", url: "https://www.youtube.com/user/AdaniGroup" },
      { label: "Facebook", icon: "Facebook", url: "https://www.facebook.com/AdaniGroup" },
    ],
  },
} as const;

export type ContactContent = typeof contactContent;
