
const ChooseUsReason = ({ title, description }) => {
    return (
        <>
            <h3 className="font-bold lg:text-2xl md:text-xl text-xs">
                {title}:
            </h3>
            <p className="lg:text-2xl md:text-xl text-xs">
                {description}
            </p>
        </>
    )
}

export default ChooseUsReason
