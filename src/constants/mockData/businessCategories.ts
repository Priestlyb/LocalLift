import type { IconName } from "../icons/icon-symbol";

interface BusinessCategory {
    id: string;
    title: string;
    iconName: IconName;
}

export const businessCategories: BusinessCategory[] = [
    {
        id: "Restaurant",
        title: "Restaurant",
        iconName: "FoodIcon",
    },
    {
        id: "Beauty Salon",
        title: "Beauty Salon",
        iconName: "SpaIcon",
    },
    {
        id: "Fitness Center",
        title: "Fitness Center",
        iconName: "GymIcon",
    },
    {
        id: "Retail Store",
        title: "Retail Store",
        iconName: "StoreIcon",
    },
    {
        id: "Pharmacy",
        title: "Pharmacy",
        iconName: "PillsIcon",
    },
    {
        id: "Real Estate",
        title: "Real Estate",
        iconName: "HomeIcon",
    },
    {
        id: "Service Business",
        title: "Service Business",
        iconName: "WrenchIcon",
    },
];