import { useEffect, type FunctionComponent } from "react";
import OsWindow from "../../components/window/OsWindow";
import type { DefaultApplicationProps } from "../../state/applications";
import { OS_BUILD, OS_VERSION } from "../../state/version";

const TerminalApplication: FunctionComponent<DefaultApplicationProps> = (
  props
) => {
  const { key, title, position, onClose, isFocused, setFocused } = props;

  useEffect(() => {
    // character repeat function
    var repeat = function (text: string, num: number) {
      return new Array(num + 1).join(text);
    };

    var dostoy = (function () {
      var charSet: string[] = [];
      var fontHeight = 0;

      var curX = 0;
      var curY = 0;

      var maxX = 0;
      var maxY = 0;

      var foregroundColor = 7;
      var backgroundColor = 0;

      var ctx: any = null;

      var cursor = true;
      var flipflop = true;

      var applicationInputHandler: any = null;
      var shellInputHandler: any = null;
      var singleKeyInputHandler: any = null;
      var singleKeyInputHandlerUsed = false;

      var inputBuffer = "";

      var prompt = ">";

      var shell = true;

      var ansiColors = [
        // quickbasic order
        [0, 0, 0],
        [0, 0, 170],
        [0, 170, 0],
        [0, 170, 170],
        [170, 0, 0],
        [170, 0, 170],
        [170, 85, 0],
        [170, 170, 170],
        [85, 85, 85],
        [85, 85, 255],
        [85, 255, 85],
        [85, 255, 255],
        [255, 85, 85],
        [255, 85, 255],
        [255, 255, 85],
        [255, 255, 255],
      ];

      var byte2bits = function (a: any) {
        var tmp = "";
        for (var i = 128; i >= 1; i /= 2) tmp += a & i ? "1" : "0";
        return tmp;
      };

      var initCharSet = function (font: any | Uint8Array, width: number) {
        var fontBuffer = null;

        var rawLength = font.length;

        fontBuffer = new Uint8Array(new ArrayBuffer(rawLength));
        for (i = 0; i < rawLength; i++) {
          fontBuffer[i] = font.charCodeAt(i);
        }

        for (var x = 0; x < fontBuffer.length / width; x++) {
          var charI = ctx.createImageData(8, width);
          for (var i = 0; i < width; i++) {
            var bitString = byte2bits(fontBuffer[x * width + i]);
            for (var j = 0; j < 8; j++) {
              charI.data[(i * 8 + j) * 4 + 0] = bitString[j] == "1" ? 255 : 0;
              charI.data[(i * 8 + j) * 4 + 1] = bitString[j] == "1" ? 255 : 0;
              charI.data[(i * 8 + j) * 4 + 2] = bitString[j] == "1" ? 255 : 0;
              charI.data[(i * 8 + j) * 4 + 3] = 255;
            }
          }
          charSet.push(charI);
        }
      };

      var onCommand = function (inputBuffer: any) {
        if (applicationInputHandler) {
          applicationInputHandler(inputBuffer);
        } else {
          shellInputHandler(inputBuffer);
        }
      };

      var cls = function () {
        curX = 0;
        curY = 0;
        ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle =
          "rgba(" +
          ansiColors[backgroundColor][0] +
          "," +
          ansiColors[backgroundColor][1] +
          "," +
          ansiColors[backgroundColor][2] +
          ",1)";
        ctx.fill();
      };
      var initCanvas = function (canvas: any) {
        ctx = canvas.getContext("2d");
        cls();
      };

      var chr = function (code: any) {
        var codes = code.split(",");
        var out = "";
        for (var i = 0, icode; (icode = codes[i]); i++)
          out += String.fromCharCode(icode);

        return out;
      };

      var newLine = function () {
        cursorBlink(false);
        if (curY + 1 > maxY) {
          ctx.putImageData(
            ctx.getImageData(
              0,
              fontHeight,
              ctx.canvas.width,
              ctx.canvas.height - fontHeight
            ),
            0,
            0
          );
          ctx.rect(0, maxY * fontHeight, ctx.canvas.width, fontHeight);
          ctx.fillStyle = "rgba(0,0,0,1)";
          ctx.fill();

          curX = 0;
        } else {
          curY++;
          curX = 0;
        }
      };

      var doPrompt = function () {
        if (prompt && shell) print(prompt);
      };

      var print = function (text: any) {
        text = text.toString().replace(/\t/g, "       ");
        var startXReal = curX * 8;
        var startYReal = curY * fontHeight;

        for (var i = 0; i < Math.min(text.length, maxX); i++) {
          var charImage: any = charSet[text.charCodeAt(i)];

          if (backgroundColor != 0 || foregroundColor != 15) {
            var colorizedCharImage = ctx.createImageData(8, fontHeight);

            for (var j = 0; j < colorizedCharImage.data.length; j += 4) {
              colorizedCharImage.data[j] =
                charImage.data[j] !== 255
                  ? ansiColors[backgroundColor][0]
                  : ansiColors[foregroundColor][0];
              colorizedCharImage.data[j + 1] =
                charImage.data[j + 1] !== 255
                  ? ansiColors[backgroundColor][1]
                  : ansiColors[foregroundColor][1];
              colorizedCharImage.data[j + 2] =
                charImage.data[j + 2] !== 255
                  ? ansiColors[backgroundColor][2]
                  : ansiColors[foregroundColor][2];
              colorizedCharImage.data[j + 3] = 255;
            }

            ctx.putImageData(
              colorizedCharImage,
              startXReal + i * 8,
              startYReal
            );
          } else {
            ctx.putImageData(charImage, startXReal + i * 8, startYReal);
          }

          curX++;
        }
      };

      var color = function (bg: number, fg: number) {
        backgroundColor = bg;
        foregroundColor = fg;
      };

      var println = function (text: string) {
        if (text) print(text);
        newLine();
      };

      var cursorBlink = function (forceState: boolean = true) {
        if (cursor) {
          var XReal = curX * 8;
          var YReal = curY * fontHeight;
          if (typeof forceState != "undefined") flipflop = forceState;

          if (flipflop) {
            ctx.strokeStyle = "rgba(255,255,255,1)";
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(XReal, YReal + 13);
            ctx.lineTo(XReal + 8, YReal + 13);
            ctx.stroke();

            flipflop = false;
          } else {
            ctx.strokeStyle = "rgba(0,0,0,1)";
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(XReal, YReal + 13);
            ctx.lineTo(XReal + 80, YReal + 13); // ugly hack to clear any cursor remnants
            ctx.stroke();

            flipflop = true;
          }
        }
      };

      var initInput = function (inputSource: any) {
        inputSource.addEventListener("keydown", function (evt: any) {
          if (singleKeyInputHandler) {
            singleKeyInputHandlerUsed = true;
            singleKeyInputHandler(evt.keyCode);
            if (singleKeyInputHandlerUsed) {
              singleKeyInputHandler = null;
              singleKeyInputHandlerUsed = false;
            }

            return;
          }

          if (!shell) return;
          evt.preventDefault();

          var char;
          switch (evt.keyCode) {
            case 8: // backspace
              if (curX > prompt.length) {
                curX--;
                print(" ");
                curX--;
                cursorBlink(true);
                inputBuffer = inputBuffer.substring(0, inputBuffer.length - 1);
                char = "";
              }
              break;
            case 13: //enter
              newLine();
              if (inputBuffer.length > 0) {
                onCommand(inputBuffer);
              }

              inputBuffer = "";

              if (
                shellInputHandler &&
                !applicationInputHandler &&
                !singleKeyInputHandlerUsed
              )
                doPrompt();

              break;
            case 32: // space
              char = " ";
              break;
            case 16: // shift
              break;
            default:
              if (evt.key.length > 1) break; // évite d'afficher les caractères spéciaux ou les inputs comme alt, maj, etc
              char = evt.key;
              break;
          }

          if (char) {
            print(char);
            inputBuffer += char;
          }
        });
      };

      var setPrompt = function (newPrompt: any) {
        prompt = newPrompt;
      };

      var setCursor = function (state: any) {
        cursor = state;
      };

      var init = function (config: any) {
        if (!config.font) throw "font missing from config";
        if (!config.fontHeight) throw "fontHeight missing from config";
        if (!config.canvas) throw "canvas missing from config";

        initCanvas(config.canvas);

        initCharSet(config.font, config.fontHeight);
        fontHeight = config.fontHeight;

        config.lines
          ? (maxY = config.lines)
          : (maxY = Math.floor(ctx.canvas.height / fontHeight) - 1);
        config.columns
          ? (maxX = config.columns)
          : (maxX = Math.floor(ctx.canvas.width / 8) - 1);

        initInput(config.inputSource ? config.inputSourse : document);

        if (config.shell) {
          if (config.commandHandler) shellInputHandler = config.commandHandler;

          if (config.prompt) {
            setPrompt(config.prompt);
          }

          if (config.beforeShell) {
            config.beforeShell();
          }

          doPrompt();
        } else {
          cursor = false;
        }
        shell = config.shell;
        window.setInterval(cursorBlink, 500);
      };

      var input = function (inputPrompt: any, resultHandler: any) {
        applicationInputHandler = (function (oldPrompt) {
          return function (value: any) {
            shell = false;
            setPrompt(oldPrompt);
            applicationInputHandler = null;
            resultHandler(value);
            if (shellInputHandler) shell = true;
          };
        })(prompt);

        shell = true;
        setPrompt(inputPrompt);

        doPrompt();
      };

      var inkey = function (resultHandler: any) {
        singleKeyInputHandler = resultHandler;
        singleKeyInputHandlerUsed = false;
      };

      var locate = function (col: number, row: number) {
        if (col >= 0) curX = col < maxX ? col : 0;
        if (row >= 0) curY = row < maxY ? row : 0;
      };

      var setShell = function (value: any) {
        if (value) {
          shell = true;
          dostoy.color(0, 7);
          if (singleKeyInputHandlerUsed) doPrompt();
        } else {
          shell = false;
        }
      };

      return {
        init: init,
        print: print,
        println: println,
        input: input,
        inkey: inkey,
        locate: locate,
        cls: cls,
        chr: chr,
        color: color,
        setPrompt: setPrompt,
        setCursor: setCursor,
        setShell: setShell,
        getCols: function () {
          return maxX;
        },
        getRows: function () {
          return maxY;
        },
      };
    })();

    // initialise console
    dostoy.init({
      font: window.atob(
        "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AAAYGBgYGBgY/wAAAAAAAAAAAAAAAAD/GBgYGBgYGBgYGBgYGB8YGBgYGBgAAAAAAAAA/wAAAAAAABgYGBgYGBj/GBgYGBgYGBgYGBgfGB8YGBgYGBg2NjY2NjY2NzY2NjY2NjY2NjY2NzA/AAAAAAAAAAAAAAA/MDc2NjY2NjY2NjY2NvcA/wAAAAAAAAAAAAAA/wD3NjY2NjY2NjY2NjY3MDc2NjY2NjYAAAAAAP8A/wAAAAAAADY2NjY29wD3NjY2NjY2GBgYGBj/AP8AAAAAAAA2NjY2NjY2/wAAAAAAAAAAAAAA/wD/GBgYGBgYAAAAAAAAAP82NjY2NjY2NjY2NjY2PwAAAAAAABgYGBgYHxgfAAAAAAAAAAAAAAAfGB8YGBgYGBgAAAAAAAAAPzY2NjY2NjY2NjY2Njb/NjY2NjY2GBgYGBj/GP8YGBgYGBgYGBgYGBgY+AAAAAAAAAAAAAAAAAAfGBgYGBgY//////////////////8AAAAAAAAA//////////Dw8PDw8PDw8PDw8PDwDw8PDw8PDw8PDw8PDw//////////AAAAAAAAAAAAAAAAdtzY2Nx2AAAAAAAAAHzG/MbG/MDAQAAAAP7GxsDAwMDAwAAAAAAAAAD+bGxsbGxsAAAAAAD+xmAwGDBgxv4AAAAAAAAAAH7Y2NjYcAAAAAAAAABmZmZmfGBgwAAAAAAAAHbcGBgYGBgAAAAAAH4YPGZmZjwYfgAAAAAAOGzGxv7Gxmw4AAAAAAA4bMbGxmxsbO4AAAAAAB4wGAw+ZmZmPAAAAAAAAAAAftvbfgAAAAAAAAADBn7b2/N+YMAAAAAAABwwYGB8YGAwHAAAAAAAAHzGxsbGxsbGAAAAAAAA/gAA/gAA/gAAAAAAAAAYGH4YGAAA/wAAAAAAMBgMBgwYMAB+AAAAAAAMGDBgMBgMAH4AAAAAAA4bGxgYGBgYGBgYGBgYGBgYGBgY2NhwAAAAAAAAGBgAfgAYGAAAAAAAAAAAdtwAdtwAAAAAAAA4bGw4AAAAAAAAAAAAAAAAAAAAGBgAAAAAAAAAAAAAAAAAGAAAAAAAAAAPDAwMDAzsbDwcAAAAANhsbGxsbAAAAAAAAAAAcNgwYMj4AAAAAAAAAAAAAAB8fHx8fHwAAAAAAAAAAAAAAAAAAAAAAAA="
      ),
      fontHeight: 14,
      canvas: document.getElementById("viewPort"),
      shell: true, // enables typing, functioning like CMD prompt
      beforeShell: function () {
        dostoy.println(" ");
        dostoy.color(0, 11),
          dostoy.println(
            "     ######### ####                           #####     #########   "
          ),
          dostoy.println(
            "    :###::::###::###                         ###:::###  ###:::::### "
          ),
          dostoy.println(
            "    :::    ###  :###   ######   ##### ##### ###   ::###:###    :::  "
          ),
          dostoy.println(
            "          ###   :###  :::::### ::### ::### :###    :###::#########  "
          ),
          dostoy.println(
            "         ###    :###   #######  :###  :### :###    :### ::::::::###  "
          ),
          dostoy.println(
            "        ###     :###  ###::###  ::### ###  ::###   ###  ###    :###  "
          ),
          dostoy.println(
            "       ###      #####::########  ::#####    :::#####:  ::#########   "
          ),
          dostoy.println(
            "      :::      :::::  ::::::::    :::::       ::::::    :::::::::    "
          ),
          dostoy.println(" "),
          dostoy.println(" "),
          dostoy.println(" "),
          dostoy.println(
            dostoy.chr(
              "0" + repeat(",0", 59) + ",201" + repeat(",205", 24) + ",187"
            )
          ),
          dostoy.println(
            dostoy.chr("0" + repeat(",0", 59) + ",186" + repeat(",0", 14)) +
              "   FlavOS " +
              dostoy.chr("186")
          ),
          dostoy.println(
            dostoy.chr(
              "0" +
                repeat(",0", 59) +
                ",186" +
                repeat(",0", 12) +
                ",205,205,205,205,205,205,205,205,205,205,205,205"
            ) + dostoy.chr("185")
          ),
          dostoy.println(
            dostoy.chr(
              "0" +
                repeat(",0", 59) +
                ",186" +
                repeat(",0", 19 - OS_VERSION.length)
            ) +
              `ver. ${OS_VERSION}` +
              dostoy.chr("186")
          ),
          dostoy.println(
            dostoy.chr("0" + repeat(",0", 59) + ",186" + repeat(",0", 6)) +
              "[version d'essai] " +
              dostoy.chr("186")
          ),
          dostoy.println(
            dostoy.chr(
              "0" +
                repeat(",0", 48) +
                ",201" +
                repeat(",205", 10) +
                ",202" +
                repeat(",205", 24) +
                ",186"
            )
          ),
          dostoy.println(
            dostoy.chr("0" + repeat(",0", 48) + ",186" + repeat(",0", 10)) +
              ` (c) ${new Date().getFullYear()}, Binoclard Inc.` +
              dostoy.chr("186")
          ),
          dostoy.println(
            dostoy.chr("0" + repeat(",0", 48) + ",186" + repeat(",0", 12)) +
              "   All rights reserved." +
              dostoy.chr("186")
          ),
          dostoy.println(
            dostoy.chr("0" + repeat(",0", 48) + ",200,205,205,205,205,0") +
              "cmd 'help' pour commencer !" +
              dostoy.chr("0,205,205,188")
          ),
          dostoy.println(
            dostoy.chr(
              "0" + repeat(",0", 48) + ",200" + repeat(",205", 35) + ",188"
            )
          ),
          dostoy.println(dostoy.chr(repeat("0,", 116) + 186));
        dostoy.println("");
      },
      prompt: "[root@flavOS ~]# ",
      commandHandler: function (command: string) {
        let rootCommand = command.split(" ");
        let subCommand = rootCommand[1];

        switch (rootCommand[0]) {
          case "os":
            dostoy.println(" "),
              dostoy.color(11, 0),
              dostoy.println(dostoy.chr("201" + repeat(",205", 60) + ",187")),
              dostoy.println(
                dostoy.chr("186") +
                  `       FlavOS | ver. ${OS_VERSION}, build ${OS_BUILD}        ` +
                  dostoy.chr("186")
              ),
              dostoy.println(
                dostoy.chr("186") +
                  "                (c) Binoclard Inc. 2025                     " +
                  dostoy.chr("186")
              ),
              dostoy.println(
                dostoy.chr("186") +
                  "                        -----                               " +
                  dostoy.chr("186")
              ),
              dostoy.println(
                dostoy.chr("186") +
                  "            Built with DOSToy.js and 98.css                 " +
                  dostoy.chr("186")
              ),
              dostoy.println(dostoy.chr("200" + repeat(",205", 60) + ",188")),
              dostoy.color(0, 11),
              dostoy.println(" ");
            break;

          case "about":
            if (subCommand) {
              switch (subCommand) {
                case "/stack":
                  dostoy.println(""),
                    dostoy.color(11, 0),
                    dostoy.println(
                      dostoy.chr("201,205,205") +
                        " 7lav | stack " +
                        dostoy.chr(repeat("205,", 70) + "187")
                    ),
                    dostoy.println(
                      dostoy.chr("186,0") +
                        "Developpeur web fullstack, specialise en React (typescript), FastAPI (Python) &     " +
                        dostoy.chr("0,186")
                    ),
                    dostoy.println(
                      dostoy.chr("186,0") +
                        "Spring (Java). Polyvalent en base de donnees SQL / NoSQL, DynamoDB.                 " +
                        dostoy.chr("0,186")
                    ),
                    dostoy.println(
                      dostoy.chr("186,0") +
                        dostoy.chr(repeat("0,", 84)) +
                        dostoy.chr("0,186")
                    ),
                    dostoy.println(
                      dostoy.chr("186,0") +
                        "Bidouilleur devant l'eternel, il aime egalement administrer ses serveurs et bricoler" +
                        dostoy.chr("0,186")
                    ),
                    dostoy.println(
                      dostoy.chr("186,0") +
                        "des programmes simples sur son temps libre.                                         " +
                        dostoy.chr("0,186")
                    ),
                    dostoy.println(
                      dostoy.chr("186,0") +
                        "Membre de la communaute binoclard.net (voir cmd binoclard).                         " +
                        dostoy.chr("0,186")
                    ),
                    dostoy.println(
                      dostoy.chr("200,205,205") +
                        dostoy.chr(repeat("205,", 77)) +
                        dostoy.chr("0,1,0,205,205,205,205,188")
                    ),
                    dostoy.color(0, 11),
                    dostoy.println("");
                  break;
                case "/linkedin":
                  window.open(
                    "https://www.linkedin.com/in/flavien-belli-3b7b3b157",
                    "tab"
                  ),
                    dostoy.println(
                      "  >>> Redirection vers 'Flavien Belli' sur LinkedIn.."
                    ),
                    dostoy.color(0, 11),
                    dostoy.println("");
                  break;
                case "/github":
                  window.open("https://www.github.com/Marshlyin", "tab"),
                    dostoy.println(
                      "  >>> Redirection vers Marshlyin sur Github.."
                    ),
                    dostoy.color(0, 11),
                    dostoy.println("");
                  break;
                case "/mail":
                  window.open("mailto:contact-flav-os@pm.me", "tab"),
                    dostoy.println(
                      "  >>> Ouverture de votre client mail par default.."
                    ),
                    dostoy.println(
                      "  >>> Si le client mail n'est pas defini, le mail est a envoyer a flavien.belli@protonmail.com"
                    ),
                    dostoy.println("");
                  break;
                case "/tel":
                  dostoy.println("  >>> Portable : +33 6 38 88 72 82.."),
                    dostoy.println("");
                  break;
                case "/cv":
                  window.open("public/docs/cv_flavien_belli.pdf", "tab");
                  dostoy.println("  >>> Telechargement du CV.."),
                    dostoy.println("");
                  break;
                case "/discord":
                  dostoy.println("  >>> Redirection vers discord.."),
                    window.open(
                      "https://discord.com/users/410071811016097802",
                      "tab"
                    ),
                    dostoy.println("");
                  break;
                default:
                  dostoy.color(0, 4),
                    dostoy.println("error [-2]: unknown subcommand"),
                    dostoy.println(
                      "les arguments disponibles sont :  /github, /stack, /tel, /mail, /linkedin, /cv, /discord"
                    ),
                    dostoy.color(0, 11),
                    dostoy.println("");
              }
            } else {
              dostoy.println(""),
                dostoy.color(11, 0),
                dostoy.println(
                  dostoy.chr("201,205,205") +
                    " 7lav | a propos " +
                    dostoy.chr(repeat("205,", 67) + "187")
                ),
                dostoy.println(
                  dostoy.chr("186,0") +
                    "Developpeur web fullstack en semaine et binoclard a toute heure,                    " +
                    dostoy.chr("0,186")
                ),
                dostoy.println(
                  dostoy.chr("186,0") +
                    "Flav est le createur de FlavOS.                                                     " +
                    dostoy.chr("0,186")
                ),
                dostoy.println(
                  dostoy.chr("186,0") +
                    dostoy.chr(repeat("0,", 84)) +
                    dostoy.chr("0,186")
                ),
                dostoy.println(
                  dostoy.chr("186,0") +
                    "Flav est disponible par e-mail et par discord, si vous avez besoin de le contacter  " +
                    dostoy.chr("0,186")
                ),
                dostoy.println(
                  dostoy.chr("186,0") +
                    "a propos de FlavOS ou pour des raisons professionnelles.                            " +
                    dostoy.chr("0,186")
                ),
                dostoy.println(
                  dostoy.chr("186,0") +
                    dostoy.chr(repeat("205,", 85)) +
                    dostoy.chr("185")
                ),
                dostoy.println(
                  dostoy.chr("186,0") +
                    "                sub-commands: /github, /tel, /mail, /linkedin, /cv, /discord, /stack" +
                    dostoy.chr("0,186")
                ),
                dostoy.println(
                  dostoy.chr("200,205,205") +
                    dostoy.chr(repeat("205,", 61)) +
                    " binoclardement " +
                    dostoy.chr("0,1,0,205,205,205,205,188")
                ),
                dostoy.color(0, 11),
                dostoy.println("");
            }
            break;
          case "binoclard":
            dostoy.println(""),
              dostoy.color(11, 0),
              dostoy.println(
                dostoy.chr("201,205,205") +
                  " Binoclard | Kezako ? " +
                  dostoy.chr(repeat("205,", 62) + "187")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  "Les Binoclards sont une micro-communaute d'amis, de bidouilleurs qui cherchent a    " +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  "s'amuser et creer en dehors des geants du web via de nombreux services autoheberges." +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 84)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  "Streaming video, irc, teamspeak, recommandations musicales, livre de recettes...    " +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  "On trouve de tout chez les binoclards !                                             " +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("205,", 85)) +
                  dostoy.chr("185")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  "                                                   ---->  www.binoclard.net  <----  " +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("200,205,205") +
                  dostoy.chr(repeat("205,", 61)) +
                  " binoclardement " +
                  dostoy.chr("0,1,0,205,205,205,205,188")
              ),
              dostoy.color(0, 11),
              dostoy.println("");
            break;
          case "changelog":
            dostoy.println(
              dostoy.chr("201,205,205") +
                " Changelog " +
                dostoy.chr(repeat("205,", 72) + "187")
            ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 83)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 22)) +
                  "::::====-----------------------====::::" +
                  dostoy.chr(repeat("0,", 22)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 22)) +
                  "::::====     Version 0.2.0     ====::::" +
                  dostoy.chr(repeat("0,", 22)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 22)) +
                  "::::====-----------------------====::::" +
                  dostoy.chr(repeat("0,", 22)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 83)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  "- Fix error input avec un clavier autre que QWERTY (oui c'est possible)            " +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  "- Les entrees claviers comme Alt, VerMaj, etc, ne s'affichent plus dans la console " +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  "- L'usage du CPU a ete reduit                                                      " +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  "- La fonction CLS existe vraiment                                                      " +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 83)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 22)) +
                  "::::====-----------------------====::::" +
                  dostoy.chr(repeat("0,", 22)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 22)) +
                  "::::====     Version 0.1.1     ====::::" +
                  dostoy.chr(repeat("0,", 22)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 22)) +
                  "::::====-----------------------====::::" +
                  dostoy.chr(repeat("0,", 22)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 83)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  "- Ajout du changelog                                                               " +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  "- Ajout de la commande binoclard                                                   " +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  "- Ajout de la sous commande /github dans about                                     " +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  "- Suppression de characteres non interpretes                                       " +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 83)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 22)) +
                  "::::====-----------------------====::::" +
                  dostoy.chr(repeat("0,", 22)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 22)) +
                  "::::====     Version 0.1.0     ====::::" +
                  dostoy.chr(repeat("0,", 22)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 22)) +
                  "::::====-----------------------====::::" +
                  dostoy.chr(repeat("0,", 22)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 83)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  "- Creation du FlavOS                                                               " +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  "- Ajout des commandes about, os et cls et sous commandes                           " +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("186,0") +
                  dostoy.chr(repeat("0,", 83)) +
                  dostoy.chr("0,186")
              ),
              dostoy.println(
                dostoy.chr("200,205,205") +
                  dostoy.chr(repeat("205,", 76)) +
                  dostoy.chr("0,1,0,205,205,205,205,188")
              );
            break;
          case "help":
            dostoy.println(
              "   " +
                "about         |" +
                " Plus d'informations sur le createur de FlavOS."
            ),
              dostoy.println(
                "   " +
                  "os            |" +
                  " Plus d'informations sur le systeme d'exploitation FlavOS."
              ),
              dostoy.println(
                "   " +
                  "binoclard     |" +
                  " Plus d'informations sur la communaute binoclard"
              ),
              dostoy.println(
                "   " + "changelog     |" + " Voir les nouveautes."
              ),
              dostoy.println(
                "   " + "cls           |" + " Nettoie l'invite de commande."
              ),
              dostoy.println("");
            break;
          case "cls":
            dostoy.cls();
            break;
          default:
            dostoy.color(0, 4),
              dostoy.println("error [-2]: unknown command"),
              dostoy.println(
                "Contactez nous a contact-flav-os@pm.me si vous pensez qu'il s'agit d'une erreur."
              ),
              dostoy.color(0, 11),
              dostoy.println("");
        }
      },
    });
  }, []);

  return (
    <>
      <OsWindow
        key={key}
        title={title}
        position={position}
        onClose={onClose}
        withToolbar={false}
        size="large"
        isFocused={isFocused}
        setFocused={setFocused}
      >
        <>
          <main id="console">
            <canvas id="viewPort" width="706" height="546"></canvas>
          </main>
        </>
      </OsWindow>
    </>
  );
};

export default TerminalApplication;
