export const defaultFieldData = {
  companyName: "XE",
  password: "",
  confirmPassword: "",
  selectLang: "EL",
  isPrimary: true,
  radio: "",
  daysPto: 0,
  invoice: [
    {
      vatNumber: 1234567890,
    },
  ],
  hasOffice: false,
  address: undefined,
};

export const selectLangOptions = ["EL", "EN", "ES", "FR"] as const;

export const radioOptions = ["AM", "FM"] as const;
