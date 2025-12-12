import { Variants } from "framer-motion";

// Fade in animation
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
};

// Slide up animation
export const slideUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } }
};

// Slide down animation
export const slideDown: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

// Scale in animation
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

// Stagger container for child animations
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        }
    }
};

// Stagger items
export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

// Card hover animation
export const cardHover: Variants = {
    rest: {
        scale: 1,
        transition: { duration: 0.2, ease: "easeOut" }
    },
    hover: {
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: {
        scale: 0.98,
        transition: { duration: 0.1 }
    }
};

// Button hover animation
export const buttonHover: Variants = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: {
        scale: 0.95,
        transition: { duration: 0.1 }
    }
};

// Modal animation
export const modalOverlay: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.2 }
    },
    exit: { opacity: 0 }
};

export const modalContent: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: { duration: 0.2 }
    }
};

// Sidebar animation
export const sidebarItem: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

// Price ticker animation
export const priceTicker: Variants = {
    initial: { opacity: 0.5 },
    animate: {
        opacity: 1,
        transition: { duration: 0.3 }
    }
};

// Infinite scroll animation for feature pills
export const infiniteScroll = {
    animate: {
        x: [0, -1920],
        transition: {
            x: {
                repeat: Infinity,
                repeatType: "loop" as const,
                duration: 30,
                ease: "linear",
            }
        }
    }
};

// Page transition
export const pageTransition: Variants = {
    hidden: { opacity: 0 },
    enter: {
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.3, ease: "easeIn" }
    }
};
