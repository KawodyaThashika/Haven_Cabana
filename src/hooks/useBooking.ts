import { useState, useCallback } from "react";
import { getPackages, HavenPackage } from "../data/packages";
import { calculateNights, calculatePrice, PriceBreakdown } from "../utils/priceCalculator";

export interface BookingFormData {
    // Guest details
    guestName: string;
    whatsapp: string;
    email: string;
    country: string;
    guests: number;

    // Stay details
    packageId: string;
    checkIn: Date | null;
    checkOut: Date | null;
}

export interface BookingState {
    formData: BookingFormData;
    selectedPackage: HavenPackage | null;
    nights: number;
    priceBreakdown: PriceBreakdown | null;
    errors: Partial<Record<keyof BookingFormData, string>>;
    step: "form" | "summary" | "sent";
}

const defaultForm: BookingFormData = {
    guestName: "",
    whatsapp: "",
    email: "",
    country: "",
    guests: 1,
    packageId: "",
    checkIn: null,
    checkOut: null,
};

export function useBooking(initialPackageId?: string) {
    const [state, setState] = useState<BookingState>({
        formData: { ...defaultForm, packageId: initialPackageId || "" },
        selectedPackage: null,
        nights: 0,
        priceBreakdown: null,
        errors: {},
        step: "form",
    });

    const packages = getPackages();

    const updateField = useCallback(
        <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => {
            setState((prev) => {
                const newForm = { ...prev.formData, [field]: value };

                // Find package
                const pkg = packages.find((p) => p.id === newForm.packageId) || null;

                // Recalculate nights and price
                let nights = 0;
                let priceBreakdown = null;
                if (newForm.checkIn && newForm.checkOut && pkg) {
                    nights = calculateNights(newForm.checkIn, newForm.checkOut);
                    priceBreakdown = calculatePrice(pkg, nights);
                }

                return {
                    ...prev,
                    formData: newForm,
                    selectedPackage: pkg,
                    nights,
                    priceBreakdown,
                    errors: { ...prev.errors, [field]: undefined },
                };
            });
        },
        [packages]
    );

    const validate = useCallback((): boolean => {
        const { formData, selectedPackage } = state;
        const errors: Partial<Record<keyof BookingFormData, string>> = {};

        if (!formData.guestName.trim()) errors.guestName = "Name is required";
        if (!formData.whatsapp.trim()) errors.whatsapp = "WhatsApp number is required";
        if (!formData.email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email";
        if (!formData.country.trim()) errors.country = "Country is required";
        if (!formData.packageId) errors.packageId = "Please select a package";

        if (!formData.checkIn) {
            errors.checkIn = "Check-in date is required" as never;
        } else if (formData.checkIn < new Date(new Date().setHours(0, 0, 0, 0))) {
            errors.checkIn = "Check-in cannot be in the past" as never;
        }

        if (!formData.checkOut) {
            errors.checkOut = "Check-out date is required" as never;
        } else if (formData.checkIn && formData.checkOut <= formData.checkIn) {
            errors.checkOut = "Check-out must be after check-in" as never;
        }

        if (formData.guests < 1) errors.guests = "At least 1 guest required";
        if (selectedPackage && formData.guests > selectedPackage.guests) {
            errors.guests = `${selectedPackage.name} allows up to ${selectedPackage.guests} guests`;
        }

        setState((prev) => ({ ...prev, errors }));
        return Object.keys(errors).length === 0;
    }, [state]);

    const goToSummary = useCallback(() => {
        if (validate()) {
            setState((prev) => ({ ...prev, step: "summary" }));
        }
    }, [validate]);

    const goBack = useCallback(() => {
        setState((prev) => ({ ...prev, step: "form" }));
    }, []);

    const markSent = useCallback(() => {
        setState((prev) => ({ ...prev, step: "sent" }));
    }, []);

    const reset = useCallback(() => {
        setState({
            formData: defaultForm,
            selectedPackage: null,
            nights: 0,
            priceBreakdown: null,
            errors: {},
            step: "form",
        });
    }, []);

    return { state, packages, updateField, goToSummary, goBack, markSent, reset };
}
