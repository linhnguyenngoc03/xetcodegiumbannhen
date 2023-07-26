const FlexBox = ({ children, justifyContent,...props }: any) => {
    return (
        <div
            {...props}
            style={{
                justifyContent: justifyContent !== undefined ? justifyContent : "space-between",
                display: "flex",
                alignItems: "center",
            }}
        >
            {children}
        </div>
    )
}

export default FlexBox