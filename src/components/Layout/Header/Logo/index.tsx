import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {

  return (
    <Link href="/">
      <Image
        src="/images/logo/logo-white.png"
        alt="logo"
        width={160}
        height={50}
        quality={100}
        className='dark:hidden max-h-14 w-auto'
      />
      <Image
        src="/images/logo/logo.png"
        alt="logo"
        width={160}
        height={50}
        quality={100}
        className='dark:block hidden max-h-14 w-auto'
      />
    </Link>
  );
};

export default Logo;
