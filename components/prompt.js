import React, { useEffect } from 'react';
import Typed from 'typed.js';

const commands = [
  'welcome',
  'brew install ffmpeg',
  'bundle exec pod install',
  'cd',
  'docker ps -a',
  'git checkout develop',
  'git rebase -i HEAD~20',
  'git reset --soft HEAD~1',
  'make do',
  'mosh ApplePi',
  'rm -rf *',
  'sudo apt upgrade',
  'sudo shutdown now',
  'sudo systemctl restart nginx.service',
  'sudo ufw enable',
  'nvim .bashrc',
  'nvim Dockerfile',
  'yarn dev',
  'yarn install',
];

const Typing = () => {
  const strings = [].concat(...shuffle(commands));

  useEffect(() => {
    const typed = new Typed('#prompt', {
      strings: strings,
      typeSpeed: 90,
      fadeOut: true,
      cursorChar: '_',
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return <span id="prompt"></span>;
};

export default Typing;

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
