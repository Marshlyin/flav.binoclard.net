window.onload = function () {

// character repeat function
var repeat = function (text, num) {
    return new Array(num + 1).join(text);
}

// initialise console
    dostoy.init({
        font: window.atob("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AAAYGBgYGBgY/wAAAAAAAAAAAAAAAAD/GBgYGBgYGBgYGBgYGB8YGBgYGBgAAAAAAAAA/wAAAAAAABgYGBgYGBj/GBgYGBgYGBgYGBgfGB8YGBgYGBg2NjY2NjY2NzY2NjY2NjY2NjY2NzA/AAAAAAAAAAAAAAA/MDc2NjY2NjY2NjY2NvcA/wAAAAAAAAAAAAAA/wD3NjY2NjY2NjY2NjY3MDc2NjY2NjYAAAAAAP8A/wAAAAAAADY2NjY29wD3NjY2NjY2GBgYGBj/AP8AAAAAAAA2NjY2NjY2/wAAAAAAAAAAAAAA/wD/GBgYGBgYAAAAAAAAAP82NjY2NjY2NjY2NjY2PwAAAAAAABgYGBgYHxgfAAAAAAAAAAAAAAAfGB8YGBgYGBgAAAAAAAAAPzY2NjY2NjY2NjY2Njb/NjY2NjY2GBgYGBj/GP8YGBgYGBgYGBgYGBgY+AAAAAAAAAAAAAAAAAAfGBgYGBgY//////////////////8AAAAAAAAA//////////Dw8PDw8PDw8PDw8PDwDw8PDw8PDw8PDw8PDw//////////AAAAAAAAAAAAAAAAdtzY2Nx2AAAAAAAAAHzG/MbG/MDAQAAAAP7GxsDAwMDAwAAAAAAAAAD+bGxsbGxsAAAAAAD+xmAwGDBgxv4AAAAAAAAAAH7Y2NjYcAAAAAAAAABmZmZmfGBgwAAAAAAAAHbcGBgYGBgAAAAAAH4YPGZmZjwYfgAAAAAAOGzGxv7Gxmw4AAAAAAA4bMbGxmxsbO4AAAAAAB4wGAw+ZmZmPAAAAAAAAAAAftvbfgAAAAAAAAADBn7b2/N+YMAAAAAAABwwYGB8YGAwHAAAAAAAAHzGxsbGxsbGAAAAAAAA/gAA/gAA/gAAAAAAAAAYGH4YGAAA/wAAAAAAMBgMBgwYMAB+AAAAAAAMGDBgMBgMAH4AAAAAAA4bGxgYGBgYGBgYGBgYGBgYGBgY2NhwAAAAAAAAGBgAfgAYGAAAAAAAAAAAdtwAdtwAAAAAAAA4bGw4AAAAAAAAAAAAAAAAAAAAGBgAAAAAAAAAAAAAAAAAGAAAAAAAAAAPDAwMDAzsbDwcAAAAANhsbGxsbAAAAAAAAAAAcNgwYMj4AAAAAAAAAAAAAAB8fHx8fHwAAAAAAAAAAAAAAAAAAAAAAAA="),
        fontHeight: 14,
        canvas: document.getElementById("viewPort"),
        shell: true, // enables typing, functioning like CMD prompt
        beforeShell: function () {
            dostoy.println(" ")
            dostoy.color(0,11),   
                                                                                                                    
            dostoy.println("     ######### ####                           #####     #########                    #####        ########        "),
            dostoy.println("    :###::::###::###                         ###:::###  ###:::::###                 ###:::###     ###::::###      "),
            dostoy.println("    :::    ###  :###   ######   ##### ##### ###   ::###:###    :::     ##### ##### ###   ::###   :::    :###      "),
            dostoy.println("          ###   :###  :::::### ::### ::### :###    :###::#########    ::### ::### :###    :###      #######       "),
            dostoy.println("         ###    :###   #######  :###  :### :###    :### ::::::::###    :###  :### :###    :###     ###::::        "),
            dostoy.println("        ###     :###  ###::###  ::### ###  ::###   ###  ###    :###    ::### ###  ::###   ###     ###      #      "),
            dostoy.println("       ###      #####::########  ::#####    :::#####:  ::#########      ::#####    :::#####:   ##:##########      "),
            dostoy.println("      :::      :::::  ::::::::    :::::       ::::::    :::::::::        :::::       ::::::   :: ::::::::::       "),
            dostoy.println(" "),
            dostoy.println(" "),
            dostoy.println(" "),
            dostoy.println(dostoy.chr("0" + repeat(",0", 90) + ",201" + repeat(",205",24) + ",187")),
            dostoy.println(dostoy.chr("0" + repeat(",0", 90) + ",186" + repeat(",0",14)) + "   FlavOS " + dostoy.chr("186")),
            dostoy.println(dostoy.chr("0" + repeat(",0", 90) + ",186" + repeat(",0",12) + ",205,205,205,205,205,205,205,205,205,205,205,205") + dostoy.chr("185")),
            dostoy.println(dostoy.chr("0" + repeat(",0", 90) + ",186" + repeat(",0",14)) + "ver. 0.2a " + dostoy.chr("186")),
            dostoy.println(dostoy.chr("0" + repeat(",0", 90) + ",186" + repeat(",0",6)) + "[version d'essai] " + dostoy.chr("186")),
            dostoy.println(dostoy.chr("0" + repeat(",0", 79) + ",201" + repeat(",205",10) +",202" + repeat(",205",24) + ",186")),
            dostoy.println(dostoy.chr("0" + repeat(",0", 79) + ",186" + repeat(",0",10)) + " (c) 2025, Binoclard Inc." + dostoy.chr("186")),
            dostoy.println(dostoy.chr("0" + repeat(",0", 79) + ",186" + repeat(",0",12)) + "   All rights reserved." + dostoy.chr("186")),
            dostoy.println(dostoy.chr("0" + repeat(",0", 79) + ",200,205,205,205,205,0") + "cmd 'help' pour commencer !" + dostoy.chr("0,205,205,188")),
            dostoy.println(dostoy.chr("0" + repeat(",0", 79) + ",200" + repeat(",205",35) + ",185")),
            dostoy.println(dostoy.chr(repeat("0,",116) + 186)),
            
            dostoy.println(dostoy.chr(repeat("205,",116) + 188)),
            dostoy.println(" ")
            dostoy.println(" "),
            dostoy.println(" ");
        },
        prompt: "[root@flavOS ~]# ",
        commandHandler: function (command) {
            let rootCommand = command.split(" ");
            let subCommand = rootCommand[1];

            switch (rootCommand[0]) {
                case "os":
                    dostoy.println(" "),
                    dostoy.color(11,0),
                    dostoy.println(dostoy.chr("201" + repeat(",205",60) + ",187")),
                    dostoy.println(dostoy.chr("186") + "       FlavOS | ver. 0.2-alpha, build 0.2.103               " + dostoy.chr("186")),
					dostoy.println(dostoy.chr("186") + "                (c) Binoclard Inc. 2025                     " + dostoy.chr("186")),
                    dostoy.println(dostoy.chr("186") + "                        -----                               " + dostoy.chr("186")),
                    dostoy.println(dostoy.chr("186") + "            Built with DOSToy.js and 98.css                 " + dostoy.chr("186")),
                    dostoy.println(dostoy.chr("200" + repeat(",205",60) + ",188")),
                    dostoy.color(0,11),
                    dostoy.println(" ");
                    break;

                case "about": 
                    if (subCommand) 
                    {
                        switch(subCommand) {
                            case "/stack": 
                                dostoy.println(""),
                                dostoy.color(11,0),
                                dostoy.println(dostoy.chr("201,205,205") + " 7lav | stack " + dostoy.chr(repeat("205,",70) + "187")),
                                dostoy.println(dostoy.chr("186,0") + "Developpeur web fullstack, specialise en React (typescript), FastAPI (Python) &     " + dostoy.chr("0,186")),
                                dostoy.println(dostoy.chr("186,0") + "Spring (Java). Polyvalent en base de donnees SQL / NoSQL, DynamoDB.                 " + dostoy.chr("0,186")),
                                dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,",84)) + dostoy.chr("0,186")),
                                dostoy.println(dostoy.chr("186,0") + "Bidouilleur devant l'eternel, il aime egalement administrer ses serveurs et bricoler" + dostoy.chr("0,186")),
                                dostoy.println(dostoy.chr("186,0") + "des programmes simples sur son temps libre.                                         " + dostoy.chr("0,186")),
                                dostoy.println(dostoy.chr("186,0") + "Membre de la communaute binoclard.net (voir cmd binoclard).                         " + dostoy.chr("0,186")),
                                dostoy.println(dostoy.chr("200,205,205") + dostoy.chr(repeat("205,",77)) +  dostoy.chr("0,1,0,205,205,205,205,188")),
                                dostoy.color(0,11),
                                dostoy.println(""); 
                                break;
                            case "/linkedin": 
                                window.open("https://www.linkedin.com/in/flavien-belli-3b7b3b157","tab"),
                                dostoy.println("  >>> Redirection vers 'Flavien Belli' sur LinkedIn.."),
                                dostoy.color(0,11),
                                dostoy.println("");
                                break;
                            case "/github": 
                                window.open("https://www.github.com/Marshlyin","tab"),
                                dostoy.println("  >>> Redirection vers Marshlyin sur Github.."),
                                dostoy.color(0,11),
                                dostoy.println("");
                                break;
                            case "/mail": 
                                window.open("mailto:contact-flav-os@pm.me","tab"),
                                dostoy.println("  >>> Ouverture de votre client mail par default.."),
                                dostoy.println("  >>> Si le client mail n'est pas defini, le mail est a envoyer a flavien.belli@protonmail.com"),
                                dostoy.println("");
                                break;
                            case "/tel": 
                                dostoy.println("  >>> Portable : +33 6 38 88 72 82.."),
                                dostoy.println("");
                                break;
                            case "/cv":
                                window.open("public/docs/cv_flavien_belli.pdf", "tab")
                                dostoy.println("  >>> Telechargement du CV.."),
                                dostoy.println("");
                                break;
                            case "/discord": 
                                dostoy.println("  >>> Redirection vers discord.."),
                                window.open("https://discord.com/users/410071811016097802","tab"),
                                dostoy.println("");
                                break;  
                            default:
                                dostoy.color(0,4),
                                dostoy.println("error [-2]: unknown subcommand"),
                                dostoy.println("les arguments disponibles sont :  /github, /stack, /tel, /mail, /linkedin, /cv, /discord"),
                                dostoy.color(0,11),
                                dostoy.println("");   
                        }
                    } else {
                        dostoy.println(""),
                        dostoy.color(11,0),
                        dostoy.println(dostoy.chr("201,205,205") + " 7lav | a propos " + dostoy.chr(repeat("205,",67) + "187")),
                        dostoy.println(dostoy.chr("186,0") + "Developpeur web fullstack en semaine et binoclard a toute heure,                    " + dostoy.chr("0,186")),
                        dostoy.println(dostoy.chr("186,0") + "Flav est le createur de FlavOS.                                                     " + dostoy.chr("0,186")),
                        dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,",84)) + dostoy.chr("0,186")),
                        dostoy.println(dostoy.chr("186,0") + "Flav est disponible par e-mail et par discord, si vous avez besoin de le contacter  " + dostoy.chr("0,186")),
                        dostoy.println(dostoy.chr("186,0") + "a propos de FlavOS ou pour des raisons professionnelles.                            " + dostoy.chr("0,186")),
                        dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("205,",85)) + dostoy.chr("185")),
                        dostoy.println(dostoy.chr("186,0") + "                sub-commands: /github, /tel, /mail, /linkedin, /cv, /discord, /stack" + dostoy.chr("0,186")),
                        dostoy.println(dostoy.chr("200,205,205") + dostoy.chr(repeat("205,",61)) + " binoclardement " +  dostoy.chr("0,1,0,205,205,205,205,188")),
                        dostoy.color(0,11),
                        dostoy.println(""); 
                    }
                    break;
                case "binoclard": 
                    dostoy.println(""),
                    dostoy.color(11,0),
                    dostoy.println(dostoy.chr("201,205,205") + " Binoclard | Kezako ? " + dostoy.chr(repeat("205,",62) + "187")),
                    dostoy.println(dostoy.chr("186,0") + "Les Binoclards sont une micro-communaute d'amis, de bidouilleurs qui cherchent a    " + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + "s'amuser et creer en dehors des geants du web via de nombreux services autoheberges." + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,",84)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + "Streaming video, irc, teamspeak, recommandations musicales, livre de recettes...    " + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + "On trouve de tout chez les binoclards !                                             " + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("205,",85)) + dostoy.chr("185")),
                    dostoy.println(dostoy.chr("186,0") + "                                                   ---->  www.binoclard.net  <----  " + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("200,205,205") + dostoy.chr(repeat("205,",61)) + " binoclardement " +  dostoy.chr("0,1,0,205,205,205,205,188")),
                    dostoy.color(0,11),
                    dostoy.println(""); 
                break;
                case "changelog": 
                    dostoy.println(dostoy.chr("201,205,205") + " Changelog " + dostoy.chr(repeat("205,",72) + "187")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,",83)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,", 22)) + "::::====-----------------------====::::" + dostoy.chr(repeat("0,", 22)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,", 22)) + "::::====     Version 0.2.0     ====::::" + dostoy.chr(repeat("0,", 22)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,", 22)) + "::::====-----------------------====::::" + dostoy.chr(repeat("0,", 22)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,",83)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + "- Fix error input avec un clavier autre que QWERTY (oui c'est possible)            " + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,",83)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,", 22)) + "::::====-----------------------====::::" + dostoy.chr(repeat("0,", 22)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,", 22)) + "::::====     Version 0.1.1     ====::::" + dostoy.chr(repeat("0,", 22)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,", 22)) + "::::====-----------------------====::::" + dostoy.chr(repeat("0,", 22)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,",83)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + "- Ajout du changelog                                                               " + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + "- Ajout de la commande binoclard                                                   " + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + "- Ajout de la sous commande /github dans about                                     " + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + "- Suppression de characteres non interpretes                                       " + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,",83)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,", 22)) + "::::====-----------------------====::::" + dostoy.chr(repeat("0,", 22)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,", 22)) + "::::====     Version 0.1.0     ====::::" + dostoy.chr(repeat("0,", 22)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,", 22)) + "::::====-----------------------====::::" + dostoy.chr(repeat("0,", 22)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,",83)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + "- Creation du FlavOS                                                               " + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + "- Ajout des commandes about, os et cls et sous commandes                           " + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("186,0") + dostoy.chr(repeat("0,",83)) + dostoy.chr("0,186")),
                    dostoy.println(dostoy.chr("200,205,205") + dostoy.chr(repeat("205,",76)) +  dostoy.chr("0,1,0,205,205,205,205,188"))
                    break;
                case "help":
                    dostoy.println("   " + "about         |" + " Plus d'informations sur le createur de FlavOS."),
                    dostoy.println("   " + "os            |" + " Plus d'informations sur le systeme d'exploitation FlavOS."),
                    dostoy.println("   " + "binoclard     |" + " Plus d'informations sur la communaute binoclard"),
                    dostoy.println("   " + "changelog     |" + " Voir les nouveautes."),
                    dostoy.println("   " + "cls           |" + " Nettoie l'invite de commande."),
                    dostoy.println("");
                    break;
                default:
                    dostoy.color(0,4),
                    dostoy.println("error [-2]: unknown command"),
                    dostoy.println("veuillez nous contacter a contact-flav-os@pm.me si vous pensez qu'il s'agit d'une erreur."),
                    dostoy.color(0,11),
                    dostoy.println("");

            }

        }
    });
};
window.onunload = function () {
    location.reload();
}

document.getElementById("viewPort").addEventListener("click", function (evt) {
    document.getElementById("mobileInput").focus();
});
