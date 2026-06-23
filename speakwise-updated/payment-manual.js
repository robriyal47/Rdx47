const PAYMENT_CONFIG = {
  payeeName: "Nirmal Sharma",
  whatsappNumber: "919599312019",
  upiOptions: [
    {
      id: "8750241915@upi",
      label: "UPI QR",
      image: "assets/upi-8750241915-upi.png"
    },
    {
      id: "8750241915@pthdfc",
      label: "Paytm / HDFC QR",
      image: "assets/upi-8750241915-pthdfc.jpg"
    }
  ]
};

const plans = {
  speaking: {
    name: "2 Month Speaking Course",
    amount: 1000,
    note: "English Speaking Only"
  },
  discussion: {
    name: "2 Month Discussion Course",
    amount: 1500,
    note: "English Speaking + Group Discussion"
  },
  "6-month": {
    name: "6 Month Course",
    amount: 6000,
    note: "Business Communication Starter"
  },
  "12-month": {
    name: "12 Month Course",
    amount: 12000,
    note: "Complete Business Communication Program"
  }
};

const params = new URLSearchParams(window.location.search);
const selectedPlan = plans[params.get("plan")] || plans.speaking;
const formattedAmount = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
}).format(selectedPlan.amount);

document.querySelector("[data-plan-name]").textContent = selectedPlan.name;
document.querySelector("[data-plan-price]").textContent = `${formattedAmount} - ${selectedPlan.note}`;
document.querySelector("[data-payee-name]").textContent = PAYMENT_CONFIG.payeeName;
document.querySelector("[data-upi-amount]").textContent = formattedAmount;

const upiOptions = document.querySelector("[data-upi-options]");
const primaryUpi = PAYMENT_CONFIG.upiOptions[0];

upiOptions.innerHTML = PAYMENT_CONFIG.upiOptions.map((option) => `
  <article class="upi-qr-card">
    <img src="${option.image}" alt="${option.label} for ${option.id}" />
    <div>
      <strong>${option.label}</strong>
      <span>${option.id}</span>
    </div>
  </article>
`).join("");

const upiUrl =
  `upi://pay?pa=${primaryUpi.id}` +
  `&pn=Nirmal Sharma` +
  `&am=${selectedPlan.amount}` +
  `&cu=INR` +
  `&tn=${selectedPlan.name}`;

document.querySelector("[data-upi-link]").href = upiUrl;

const whatsappMessage = [
  "Hello SpeakWise, I have completed my UPI payment.",
  "",
  `Course: ${selectedPlan.name}`,
  `Amount: ${formattedAmount}`,
  `UPI ID used: ${primaryUpi.id}`,
  "Name:",
  "Transaction ID:"
].join("\n");

document.querySelector("[data-whatsapp-link]").href =
  `https://wa.me/${PAYMENT_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
