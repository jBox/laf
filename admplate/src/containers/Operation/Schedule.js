import React from "react"
import PageHeader from "../../components/PageHeader"
import Datepicker from "../../components/Datepicker"

const OperationRoom = ({ num, children }) => {
    return (
        <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col-md-4 mr-2">
                        <div className="h1 mb-0 font-weight-bold text-gray-800">{num}</div>
                    </div>
                    <div className="col-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

const OperationInfo = ({ indicator, children }) => (
    <div>{indicator}: <code>{children}</code></div>
)

export default () => {
    return (
        <>
            <PageHeader>手术排班</PageHeader>
            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <OperationRoom num="C01">
                        <OperationInfo indicator="手术台数">3 台</OperationInfo>
                        <OperationInfo indicator="麻醉台数">3 台</OperationInfo>
                        <OperationInfo indicator="剩余台数">3 台</OperationInfo>
                        <OperationInfo indicator="护士">李护士</OperationInfo>
                    </OperationRoom>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <OperationRoom num="C02">
                        <OperationInfo indicator="手术台数">3 台</OperationInfo>
                        <OperationInfo indicator="麻醉台数">3 台</OperationInfo>
                        <OperationInfo indicator="剩余台数">3 台</OperationInfo>
                        <OperationInfo indicator="护士">李护士</OperationInfo>
                    </OperationRoom>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <OperationRoom num="C03">
                        <OperationInfo indicator="手术台数">3 台</OperationInfo>
                        <OperationInfo indicator="麻醉台数">3 台</OperationInfo>
                        <OperationInfo indicator="剩余台数">3 台</OperationInfo>
                        <OperationInfo indicator="护士">李护士</OperationInfo>
                    </OperationRoom>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <OperationRoom num="C04">
                        <OperationInfo indicator="手术台数">3 台</OperationInfo>
                        <OperationInfo indicator="麻醉台数">3 台</OperationInfo>
                        <OperationInfo indicator="剩余台数">3 台</OperationInfo>
                        <OperationInfo indicator="护士">李护士</OperationInfo>
                    </OperationRoom>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <OperationRoom num="C08">
                        <OperationInfo indicator="手术台数">3 台</OperationInfo>
                        <OperationInfo indicator="麻醉台数">3 台</OperationInfo>
                        <OperationInfo indicator="剩余台数">3 台</OperationInfo>
                        <OperationInfo indicator="护士">李护士</OperationInfo>
                    </OperationRoom>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <OperationRoom num="C12">
                        <OperationInfo indicator="手术台数">3 台</OperationInfo>
                        <OperationInfo indicator="麻醉台数">3 台</OperationInfo>
                        <OperationInfo indicator="剩余台数">3 台</OperationInfo>
                        <OperationInfo indicator="护士">李护士</OperationInfo>
                    </OperationRoom>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <OperationRoom num="C13">
                        <OperationInfo indicator="手术台数">3 台</OperationInfo>
                        <OperationInfo indicator="麻醉台数">3 台</OperationInfo>
                        <OperationInfo indicator="剩余台数">3 台</OperationInfo>
                        <OperationInfo indicator="护士">李护士</OperationInfo>
                    </OperationRoom>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <OperationRoom num="C14">
                        <OperationInfo indicator="手术台数">3 台</OperationInfo>
                        <OperationInfo indicator="麻醉台数">3 台</OperationInfo>
                        <OperationInfo indicator="剩余台数">3 台</OperationInfo>
                        <OperationInfo indicator="护士">李护士</OperationInfo>
                    </OperationRoom>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <OperationRoom num="C15">
                        <OperationInfo indicator="手术台数">3 台</OperationInfo>
                        <OperationInfo indicator="麻醉台数">3 台</OperationInfo>
                        <OperationInfo indicator="剩余台数">3 台</OperationInfo>
                        <OperationInfo indicator="护士">李护士</OperationInfo>
                    </OperationRoom>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <OperationRoom num="C16">
                        <OperationInfo indicator="手术台数">3 台</OperationInfo>
                        <OperationInfo indicator="麻醉台数">3 台</OperationInfo>
                        <OperationInfo indicator="剩余台数">3 台</OperationInfo>
                        <OperationInfo indicator="护士">李护士</OperationInfo>
                    </OperationRoom>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <OperationRoom num="C18">
                        <OperationInfo indicator="手术台数">3 台</OperationInfo>
                        <OperationInfo indicator="麻醉台数">3 台</OperationInfo>
                        <OperationInfo indicator="剩余台数">3 台</OperationInfo>
                        <OperationInfo indicator="护士">李护士</OperationInfo>
                    </OperationRoom>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <OperationRoom num="C19">
                        <OperationInfo indicator="手术台数">3 台</OperationInfo>
                        <OperationInfo indicator="麻醉台数">3 台</OperationInfo>
                        <OperationInfo indicator="剩余台数">3 台</OperationInfo>
                        <OperationInfo indicator="护士">李护士</OperationInfo>
                    </OperationRoom>
                </div>
            </div>
        </>
    );
}