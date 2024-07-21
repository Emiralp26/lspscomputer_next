import Image from 'next/image';
import rdlogo from "@/imgs/odp/R&D.png"

type ODPHeaderProps = {
  header1: string;
  header2?: string;
};

const ODPHeader: React.FC<ODPHeaderProps> = ({header1, header2}) => {
  return (
    <div className="relative text-white w-[90%] h-[6rem]">
      <Image
        className="absolute bottom-0 pr-4 z-9" 
        src={rdlogo}
        width={128}
        height={128}
        alt="R&D logo picture"
      />

      <span className="block text-5xl w-full text-center">{header1}</span>
      <span className="block text-xl w-full text-center">{header2}</span>
    </div>
  )
}

export default ODPHeader;