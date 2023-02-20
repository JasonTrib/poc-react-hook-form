const formFields = {
    companyName: {
        name: 'companyName',
        placeholder: 'Company name',
        label: 'Company name',
    },
    password: {
        name: 'password',
        placeholder: 'Password',
        label: 'Password',
    },
    confirmPassword: {
        name: 'confirmPassword',
        placeholder: 'Confirm password',
        label: 'Confirm password',
    },
    selectLang: {
        name: 'selectLang',
        label: 'Select language',
        options: [
            { value: "EL" },
            { value: "EN" },
            { value: "ES" },
            { value: "FR" },
        ],
    },
    primary: {
        name: 'isPrimary',
        label: 'Primary',
    },
    radio: {
        name: 'radio',
        label: 'Radio',
        options: [
            { value: "AM" },
            { value: "FM" },
        ],
    },
    vat: {
        name: 'vat',
        placeholder: 'VAT',
        label: 'VAT',
    },
    office: {
        name: 'hasOffice',
        label: 'Office',
    },
    address: {
        name: 'address',
        placeholder: 'Address',
        label: 'Address',
    },
} as const;

export default formFields;