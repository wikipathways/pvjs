{ pkgs ? import <nixpkgs> {}, stdenv ? pkgs.stdenv }:
pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-10_x
    pkgs.nodePackages.node2nix

    # TODO: should this be specified both in here
    # and in the pkg for my custom vim?
    pkgs.nodePackages.prettier
    pkgs.nodePackages.typescript

    # Yarn ecosystem?
    #pkgs.nodePackages.lerna
    #pkgs.yarn
    # what about yarn2nix?
    #pkgs.yarn2nix

    # node-gyp dependencies (node-gyp compiles C/C++ Addons)
    #   see https://github.com/nodejs/node-gyp#on-unix
    pkgs.python2

    pkgs.libxml2 # for xmllint
  ] ++ (if stdenv.isDarwin then [
    # more node-gyp dependencies
    # XCode Command Line Tools
    # TODO: do we need cctools?
    #pkgs.darwin.cctools
  ] else [
    # more node-gyp dependencies
    pkgs.gnumake

    # gcc and binutils disagree on the version of a
    # dependency, so we need to binutils-unwrapped.
    pkgs.gcc # also provides cc
    pkgs.binutils-unwrapped # provides ar
  ]);
}
