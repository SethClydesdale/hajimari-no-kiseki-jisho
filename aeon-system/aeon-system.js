(function (window, document) {
  'use strict';
  
  // Global used for telling if the site is being used offline with MS Edge (pre-chromium).
  // Helps prevent "unspecified errors" caused by checking for the existence of localStorage support offline.
  window.offlineEdge = window.location.protocol == 'file:' && /Edge/.test(navigator.userAgent);
  
  // Global used for checking localStorage support (ex: storageOK && localStorage.myStorageItem)
  // prevents long winded conditions everytime we want to use storage
  window.storageOK = navigator.cookieEnabled && !offlineEdge && window.localStorage ? true : false;
  
  
  // Tio uses her Aeon System to provide various functions on the website (THANK YOU TIO, YOU'RE THE BEST!)
  window.AeonSystem = {
    
    // Tio initializes the Aeon System when the page is finished loading, to make modifications
    kidou : function () {
      // Tio sets keybindings so we can quickly toggle options
      document.addEventListener('keyup', function (e) {
        if (e.ctrlKey && e.altKey) {
          var button;

          // check what key was pressed
          switch (e.key.toLowerCase()) {
            // toggle furigana (ctrl+alt+f)
            case 'f':
              button = document.querySelector('.furigana-toggle');
              break;

            // toggle romaji (ctrl+alt+r)
            case 'r':
              button = document.querySelector('.romaji-toggle');
              break;

            // toggle notes (ctrl+alt+n)
            case 'n':
              button = document.querySelector('.notes-toggle');
              break;

            // toggle spoilers (ctrl+alt+s)
            case 's':
              button = document.querySelector('.spoilers-toggle');
              break;

            default:
              break;
          }

          // prevent default behavior and click the button
          if (button) {
            e.preventDefault();
            button.click();
          }
        }
      });
      
      
      // # OFFLINE LINK MODIFICATIONS #
      // appends index.html to links if this project is hosted on the local file system
      if (window.location.protocol == 'file:') {
        for (var a = document.getElementsByTagName('A'), i = 0, j = a.length; i < j; i++) {
          if (!/http/.test(a[i].href)) {
            if (/\/$/.test(a[i].href)) {
              a[i].href += 'index.html';
            } else if (/\/#.*?$/.test(a[i].href)) {
              a[i].href = a[i].href.replace(/(#.*?)$/, 'index.html$1');
            } else if (/\/\?.*?$/.test(a[i].href)) {
              a[i].href = a[i].href.replace(/(\?.*?)$/, 'index.html$1');
            }
          }
        }
      }
      
      
      // adds toggle buttons before sub-groups, so the can be opened or closed
      for (var a = document.querySelectorAll('.sub-group'), i = 0, j = a.length; i < j; i++) {
        a[i].parentNode.insertAdjacentHTML('afterBegin', '<button class="button sub-group-toggle" onclick="AeonSystem.toggleGroup(this);">＋</button>');
      }
    },
    
    
    // Tio assists us by toggling various features
    toggle : function (option) {
      var state = (storageOK && localStorage[option + 'State']) || 'true';
      
      switch (state) {
        case 'true' : // turns off if on
          state = 'false';
          document.body.className = document.body.className.replace(option + '-on', option + '-off');
          break;

        case 'false' : // turns on if off
          state = 'true';
          document.body.className = document.body.className.replace(option + '-off', option + '-on');
          break;

        default :
          break;
      }

      // save settings if supported
      if (storageOK) {
        localStorage[option + 'State'] = state;
      }
    },
    
    
    // toggles sub-groups in the navigation
    toggleGroup : function (caller) {
      var group = caller.parentNode.querySelector('.sub-group'),
          acTIOve = document.querySelector('.sub-group.actiove');
      
      // close active group
      if (acTIOve && acTIOve != group) {
        acTIOve.parentNode.querySelector('.sub-group-toggle').innerHTML = '＋';
        acTIOve.className = acTIOve.className.replace('actiove', '');
      }
      
      // hide the group
      if (/actiove/.test(group.className)) {
        caller.innerHTML = '＋';
        group.className = group.className.replace('actiove', '');
      }
      
      // show the group
      else {
        caller.innerHTML = '－';
        group.className += ' actiove';
      }
    },
    
    
    // Tio restores our settings when we return or reload
    restoreSettings : function () {
      if (!storageOK) return;
      
      for (var options = ['furigana', 'romaji', 'notes', 'spoilers'], i = 0, j = options.length; i < j; i++) {
        if (localStorage[options[i] + 'State'] == 'false') {
          document.body.className = document.body.className.replace(options[i] + '-on', options[i] + '-off');
        }
      }
    },
    
    
    // Tio releases all restrictions set by the Aeon System
    limitBreak : function (Tio) {
      if (!AeonSystem.activated) { // only activate the aeon system once per page instance
        var path = AeonSystem.getPaths();
        AeonSystem.activated = true;
        AeonSystem.animating = true;
        AeonSystem.intro = document.getElementById('intro-bubble');
        AeonSystem.introText = AeonSystem.intro.innerHTML;
        document.body.className += ' aeon-system-active';
        
        // load the audio into the Aeon System for playing
        AeonSystem.audio = {
          kidou : document.getElementById('aeon-system-kidou'),
          limitBreak : document.getElementById('aeon-system-limit-break'),
          mysticCore : document.getElementById('mystic-core')
        };
        
        // change Tio's sprite
        Tio.src = path + 'aeon-system/images/tio-staff.png';
        
        // prepare youselves for greatness... Tio.. TALKS.
        AeonSystem.audio.kidou.play();
        AeonSystem.intro.innerHTML = '<span class="aeon-system-dialogue">Aeon system, activate.</span>';
        
        // begin playing mystic core, one of the greatest tracks in Azure, made even greater by Tio's epic scene on top of Orchis tower
        setTimeout(function() { // 1; 1000
          AeonSystem.audio.mysticCore.play();
          
          // change Tio's sprite to reflect activation of the Aeon System
          setTimeout(function() { // 2; 500
            Tio.src = path + 'aeon-system/images/tio-aeon-system.png';
            
            // Tio finally releases all limiters on the Aeon System, for an epic display
            setTimeout(function() { // 3; 3000
              AeonSystem.audio.limitBreak.play();
              AeonSystem.intro.innerHTML = '<span class="aeon-system-dialogue">Aeon system, limit break!</span>';
              
              // light up Tio's cat ear sensors further
              setTimeout(function() { // 4; 2200
                Tio.parentNode.className = 'tio-limit-break';
                AeonSystem.animating = false;
                
                setTimeout(function() { // 5; 1000
                  AeonSystem.intro.innerHTML = '<span class="aeon-system-dialogue">You can stop the music at any time by *sigh* clicking me..</span>';
                  
                  setTimeout(function() { // 6; 6000
                    AeonSystem.intro.innerHTML = AeonSystem.introText;
                  }, 6000);
                }, 1000);
              }, 2200);
            }, 3000);
          }, 500);
        }, 1000);
      }
      
      // if the Aeon System is already active, toggle mystic core playback/Tio's sensor's glow
      else if (!AeonSystem.animating) {
        var path = AeonSystem.getPaths();
        
        if (AeonSystem.audio.mysticCore.paused) {
          AeonSystem.audio.mysticCore.play();
          Tio.parentNode.className = 'tio-limit-break';
          Tio.src = path + 'aeon-system/images/tio-aeon-system.png';
        } else {
          AeonSystem.audio.mysticCore.pause();
          Tio.parentNode.className = '';
          Tio.src = path + 'aeon-system/images/tio-staff.png';
        }
      }
    },
    
    
    // Tio locates and returns our current page path for us
    getPaths : function () {
      var path = window.location.pathname;

      if (/\/contact\//.test(path)) {
        return '../';

      } else {
        return '';
      }
    },
    
    
    // reward Tio by giving her a Mishy
    giveMishy : function (caller) {
      var tio = document.getElementById('tio-plato'),
          mishy = document.getElementById('mishy');
      
      // load audio into the Aeon System for playing
      AeonSystem.audio2 = {
        ahMishy : document.getElementById('tio-ah-mishy'),
        mishy : document.getElementById('tio-mishy'),
        arigatou : document.getElementById('tio-arigatou')
      };
      
      // show Tio Mishy!
      caller.style.visibility = 'hidden';
      caller.onclick = null;
      mishy.style.visibility = '';
      
      // Tio gets up in disbelief
      setTimeout(function () {
        tio.src = 'aeon-system/images/tio-plato.png';
        AeonSystem.audio2.ahMishy.play();
        
        // TO HER SURPRISE IT'S MISHY!!!
        setTimeout(function () {
          tio.src = 'aeon-system/images/tio-plato-excited.png';
          
          // she excitedly chases mishy down to give him a nice big hug
          setTimeout(function () {
            mishy.src = 'aeon-system/images/mishy-run.png';
            mishy.className = 'runLeft';
            tio.className = 'runLeft';
            
            // Tio relentlessly chases mishy down!!
            setTimeout(function () {
              mishy.className = 'runRight';
              tio.className = 'runRight';
              
              // At long last Tio nabs Mishy!!!!
              setTimeout(function () {
                mishy.className = 'runBack';
                tio.className = 'runBack';

                // Now she can happily hug her beloved Mishy... (*sniff* I'm so happy for you Tio..)
                setTimeout(function () {
                  mishy.style.display = 'none';
                  tio.className = '';
                  tio.src = 'aeon-system/images/tio-and-mishy.png';
                  AeonSystem.audio2.mishy.play();
                  
                  // Tio thanks us for the Mishy (YOU'RE WELCOME, TIOSUKE!!!)
                  setTimeout(function () {
                    tio.src = 'aeon-system/images/tio-and-mishy-excited.png';
                    AeonSystem.audio2.arigatou.play();
                  }, 1500);
                }, 3000);
              }, 3000);
            }, 3000);
          }, 1000);
        }, 1000);
      }, 500);
    }
    
  };
  
}(window, document));
