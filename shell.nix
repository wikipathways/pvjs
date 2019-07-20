{ pkgs ? import <nixpkgs> {}, stdenv ? pkgs.stdenv }:
let
  deps = import /home/ariutta/dotfiles/nix-dev-envs/node.nix;
in
  pkgs.mkShell {
    buildInputs = deps ++ [
      pkgs.libxml2 # for xmllint
    ] ++ (if stdenv.isDarwin then [] else []);
}
