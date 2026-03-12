import Image from "next/image"

const User = ({ imageUrl, alt = "User avatar" }) => {
  if (imageUrl) {
    return (
      <div className="relative w-[80%] h-[80%] flex items-center justify-center overflow-hidden rounded-full">
        <Image 
          src={imageUrl} 
          alt={alt}
          fill
          sizes="(min-width: 768px) 224px, (min-width: 640px) 112px, 67px"
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
        sizes="(min-width: 1024px) 129px, (min-width: 768px) 40px, 30px"
        className="lg:w-[129px] lg:h-[129px] md:w-[40px] md:h-[40px] w-[30px] h-[30px]"
      />
      <Image 
        src='/icons/user-2.svg' 
        alt="user's body" 
        width={237} 
        height={268} 
        sizes="(min-width: 1024px) 237px, (min-width: 768px) 60px, 40px"
        className="lg:w-[237px] lg:h-[268px] md:w-[60px] md:h-[50px] w-[40px] h-[30px]"
      />
    </div>
  );
}

export default User
