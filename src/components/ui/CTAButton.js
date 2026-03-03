import Link from "next/link"
const CTAButton = ({title,link,color,className}) => {
  return (
    <Link href={link} 
    className={`block w-[fit-content] text-white md:px-[1rem] py-[0.5rem] px-[1.5rem] font-bold hover:bg-[var(--primary-blue-second)] transition 
    ${color === "blue" ? "bg-[var(--primary-blue-first)]" :"bg-[var(--secondary)]"}
    ${className}
    `}>
    {title}
    </Link>
  )
}

export default CTAButton
