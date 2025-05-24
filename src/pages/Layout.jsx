import { Outlet } from "react-router-dom/dist";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useState } from "react";

export const Layout = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <ScrollToTop>
            <Navbar onNewContact={() => setShowModal(true)} />
            <Outlet context={{ showModal, setShowModal }} />
            <Footer />
        </ScrollToTop>
    )
}