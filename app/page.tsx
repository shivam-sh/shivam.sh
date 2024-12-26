import Description from 'app/components/description';
import Rings from './components/Rings';

export default function Page() {
  return (
    <div className="order-0 flex flex-grow-0 flex-col items-start justify-center gap-8 md:flex-row md:items-center">
      <h2 className="font-inter m-0 leading-[1.4]">
        Hey There<span className="text-accent">,</span> <br />
        I&apos;m Shivam
      </h2>

      <Description className="no-quotes text-[1.1rem] font-medium leading-relaxed" />

      <Rings
        className="max-h-100vh user-select-none -webkit-user-select:none -moz-user-select:none bottom-0 left-0 overflow-hidden opacity-30 invert dark:invert-0"
        camera={{ position: [0, 0, 4.0] }}
        style={{ position: 'fixed' }}
      />
    </div>
  );
}
