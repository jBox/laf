import React from "react"
import Tb from "../components/Topbar"
import { connect } from "react-redux"
import { toggle } from "../redux/actions/sidebar"

const Topbar = ({ handleTopbarToggle }) => {

    return (
        <Tb onSidebarToggle={handleTopbarToggle} />
    );
}

export default connect((state) => (state), {
    handleTopbarToggle: toggle
})(Topbar);