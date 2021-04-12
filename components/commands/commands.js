import React, { useRef, useEffect } from "react";
import Typed from "typed.js";

const Example = () => {
  const typeTarget = useRef(null);

  const words = [
    'make do',
    'bundle exec pod install',
    'yarn install',
    'sudo apt upgrade',
    'brew install python3',
    'rm -rf *',
    'git reset --soft HEAD~1',
    'git rebase -i HEAD~20',

  ];

  useEffect(() => {
    const typed = new Typed(typeTarget.current, {
      strings: words,
      shuffle: true,
      typeSpeed: 150,
      backSpeed: 40,
      backDelay: 1000,
      smartBackspace: false,
      cursorChar: '▊',
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return <span ref={typeTarget} />;
};

export default Example;