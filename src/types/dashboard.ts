export interface UserBalance {
    stNIBI: number;
}

export interface DashboardStats {
    pointsEarned: number;
    tvl: number;
    totalStNIBIIssued: number;
    totalNIBIIssued: number;
    totalBurned: {
        amount: number;
        usdValue: number;
    };
    stakingReward: number;
}

export interface SidebarLink {
    label: string;
    href: string;
    icon: React.ComponentType;
    isComingSoon?: boolean;
}

