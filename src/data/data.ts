export const defaultFieldsStep1Data = {
  username: "",
  password: "",
  confirmPassword: "",
};

export const defaultFieldsStep2Data = {
  companyName: "",
  isPrimary: true,
  radio: null,
  selectLang: "EL",
  daysPto: 0,
  invoice: [
    {
      vatNumber: "1234567890",
    },
  ],
  hasOffice: false,
  address: undefined,
};

export const selectLangOptions = ["EN", "EL", "ES", "FR"] as const;

export const radioOptions = ["AM", "FM"] as const;
