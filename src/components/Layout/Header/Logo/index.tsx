import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo/logo-white.png"
        alt="Oromocultural Resettlement Services Society"
        width={800}
        height={274}
        quality={100}
        className="dark:hidden h-16 w-[200px] lg:h-[80px] lg:w-[250px]"
      />
      <Image
        src="/images/logo/ocrss.png"
        alt="Oromocultural Resettlement Services Society"
        width={800}
        height={274}
        quality={100}
        className="hidden dark:block h-16 w-[200px] lg:h-[80px] lg:w-[250px]"
      />
    </Link>
  );
};

export default Logo;
