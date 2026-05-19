{pkgs ? import <nixpkgs> {}}: let
  packages = with pkgs; [
    nodejs-slim_24
    pnpm
  ];
in
  with pkgs;
    mkShell {
      name = "ngfx";
      buildInputs = packages;

      DIRENV_LOG_FORMAT = "";
    }
