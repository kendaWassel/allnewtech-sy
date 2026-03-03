import Image from "next/image"

const User = ({ imageUrl, alt = "User avatar" }) => {
  if (imageUrl) {
    return (
      <div className="relative w-[70%] h-[70%] flex items-center justify-center overflow-hidden rounded-full">
        <Image 
          src={imageUrl} 
          alt={alt}
          fill
          sizes="(max-width: 640px) 90px, (max-width: 768px) 130px, (max-width: 1024px) 18rem, 120px"
          className="object-cover rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center lg:justify-between w-full h-full">
      <Image 
        src='/icons/user-1.svg' 
        alt="user's head" 
        width={129} 
        height={129} 
        className="lg:w-[129px] lg:h-[129px] md:w-[40px] md:h-[40px] w-[30px] h-[30px]"
      />
      <Image 
        src='/icons/user-2.svg' 
        alt="user's body" 
        width={237} 
        height={268} 
        className="lg:w-[237px] lg:h-[268px] md:w-[60px] md:h-[50px] w-[40px] h-[30px]"
      />
    </div>
  );
}

export default User
