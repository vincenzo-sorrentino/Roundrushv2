/* ══════════════════════════════════════════════════════════════
   Testing Tab — "Sprint" View Implementation
   Matches Figma "Desktop - 42" (471:52266)
   ══════════════════════════════════════════════════════════════ */

/* ── SVG icons (Phosphor-style) ───────────────────────────── */
const ICON = {
  search: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><circle cx="116" cy="116" r="72" stroke="currentColor" stroke-width="16"/><line x1="168" y1="168" x2="224" y2="224" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  caretRight: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="96,48 176,128 96,208" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  caretDown: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  user: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.4329 13.2497C13.481 11.6041 12.0142 10.4241 10.3023 9.86475C11.1491 9.36066 11.8069 8.59255 12.1749 7.67837C12.5429 6.76419 12.6006 5.7545 12.3392 4.80435C12.0778 3.85419 11.5117 3.01612 10.7279 2.41883C9.94408 1.82153 8.98587 1.49805 8.00041 1.49805C7.01496 1.49805 6.05674 1.82153 5.27293 2.41883C4.48911 3.01612 3.92304 3.85419 3.66163 4.80435C3.40022 5.7545 3.45793 6.76419 3.82591 7.67837C4.19388 8.59255 4.85177 9.36066 5.69854 9.86475C3.98666 10.4235 2.51979 11.6035 1.56791 13.2497C1.53301 13.3067 1.50985 13.37 1.49982 13.436C1.48978 13.502 1.49307 13.5694 1.50949 13.6341C1.52591 13.6988 1.55512 13.7596 1.59541 13.8128C1.63569 13.8661 1.68624 13.9107 1.74405 13.9441C1.80187 13.9775 1.86579 13.999 1.93204 14.0073C1.9983 14.0156 2.06554 14.0105 2.1298 13.9924C2.19407 13.9743 2.25405 13.9435 2.30622 13.9018C2.35838 13.8601 2.40168 13.8084 2.43354 13.7497C3.61104 11.7147 5.69229 10.4997 8.00041 10.4997C10.3085 10.4997 12.3898 11.7147 13.5673 13.7497C13.5992 13.8084 13.6424 13.8601 13.6946 13.9018C13.7468 13.9435 13.8068 13.9743 13.871 13.9924C13.9353 14.0105 14.0025 14.0156 14.0688 14.0073C14.135 13.999 14.199 13.9775 14.2568 13.9441C14.3146 13.9107 14.3651 13.8661 14.4054 13.8128C14.4457 13.7596 14.4749 13.6988 14.4913 13.6341C14.5078 13.5694 14.511 13.502 14.501 13.436C14.491 13.37 14.4678 13.3067 14.4329 13.2497ZM4.50041 5.99975C4.50041 5.30751 4.70568 4.63082 5.09027 4.05525C5.47485 3.47968 6.02148 3.03108 6.66102 2.76617C7.30056 2.50126 8.0043 2.43195 8.68323 2.567C9.36216 2.70205 9.9858 3.03539 10.4753 3.52487C10.9648 4.01436 11.2981 4.638 11.4332 5.31693C11.5682 5.99586 11.4989 6.6996 11.234 7.33914C10.9691 7.97868 10.5205 8.52531 9.94491 8.90989C9.36934 9.29448 8.69265 9.49975 8.00041 9.49975C7.07246 9.49875 6.1828 9.12969 5.52664 8.47353C4.87047 7.81736 4.50141 6.9277 4.50041 5.99975Z" fill="#3D4350"/></svg>`,
  folderSimple: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><path d="M216,72H130.67a8,8,0,0,1-4.8-1.6L99.2,50.4A8,8,0,0,0,94.4,48.8L68.53,48H40a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V80A8,8,0,0,0,216,72Z" fill="currentColor"/></svg>`,
  prohibit: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><line x1="60" y1="196" x2="196" y2="60" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  flag: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><path d="M40 216V48" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><path d="M40,96c32-16,64,16,96,0s64-16,96,0V48c-32,16-64-16-96,0s-64,16-96,0Z" fill="currentColor" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  close: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><line x1="200" y1="56" x2="56" y2="200" stroke="#3d4350" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="200" y1="200" x2="56" y2="56" stroke="#3d4350" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  copy: `<svg class="rr-modal-copy-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.1875 2.25H6.1875C6.03832 2.25 5.89524 2.30926 5.78975 2.41475C5.68426 2.52024 5.625 2.66332 5.625 2.8125V5.625H2.8125C2.66332 5.625 2.52024 5.68426 2.41475 5.78975C2.30926 5.89524 2.25 6.03832 2.25 6.1875V15.1875C2.25 15.3367 2.30926 15.4798 2.41475 15.5852C2.52024 15.6907 2.66332 15.75 2.8125 15.75H11.8125C11.9617 15.75 12.1048 15.6907 12.2102 15.5852C12.3157 15.4798 12.375 15.3367 12.375 15.1875V12.375H15.1875C15.3367 12.375 15.4798 12.3157 15.5852 12.2102C15.6907 12.1048 15.75 11.9617 15.75 11.8125V2.8125C15.75 2.66332 15.6907 2.52024 15.5852 2.41475C15.4798 2.30926 15.3367 2.25 15.1875 2.25ZM11.25 14.625H3.375V6.75H11.25V14.625ZM14.625 11.25H12.375V6.1875C12.375 6.03832 12.3157 5.89524 12.2102 5.78975C12.1048 5.68426 11.9617 5.625 11.8125 5.625H6.75V3.375H14.625V11.25Z" fill="#14161B"/></svg>`,
  notes: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.99964 1.6875C7.73716 1.68722 6.49611 2.01381 5.39729 2.63547C4.29847 3.25714 3.37932 4.15269 2.7293 5.23498C2.07927 6.31726 1.72053 7.5494 1.68798 8.81146C1.65543 10.0735 1.95018 11.3225 2.54355 12.4369L1.7455 14.831C1.6794 15.0292 1.6698 15.242 1.7178 15.4453C1.76579 15.6487 1.86947 15.8347 2.01723 15.9824C2.16498 16.1302 2.35096 16.2339 2.55433 16.2818C2.75769 16.3298 2.97041 16.3202 3.16863 16.2541L5.56277 15.4561C6.54347 15.9777 7.63011 16.269 8.74021 16.308C9.85031 16.347 10.9547 16.1325 11.9695 15.6809C12.9844 15.2293 13.883 14.5525 14.5972 13.7017C15.3114 12.851 15.8224 11.8487 16.0914 10.771C16.3605 9.69326 16.3804 8.56842 16.1498 7.48184C15.9192 6.39525 15.4441 5.37549 14.7605 4.49994C14.0769 3.6244 13.2029 2.91608 12.2047 2.42877C11.2065 1.94146 10.1104 1.68796 8.99964 1.6875ZM8.99964 15.1875C7.91189 15.1882 6.84323 14.9018 5.90167 14.3571C5.83274 14.3171 5.75609 14.2923 5.67682 14.2841C5.59754 14.276 5.51744 14.2848 5.44183 14.31L2.81214 15.1875L3.68894 12.5578C3.71421 12.4823 3.72315 12.4022 3.71515 12.3229C3.70715 12.2436 3.6824 12.167 3.64253 12.098C2.96048 10.9188 2.68664 9.54744 2.86349 8.19672C3.04034 6.846 3.658 5.5914 4.62064 4.62754C5.58329 3.66368 6.83711 3.04444 8.1876 2.86588C9.53809 2.68733 10.9098 2.95944 12.0898 3.64C13.2699 4.32056 14.1924 5.37153 14.7142 6.62987C15.236 7.88822 15.328 9.28359 14.9758 10.5995C14.6237 11.9155 13.8471 13.0784 12.7665 13.908C11.686 14.7375 10.3619 15.1873 8.99964 15.1875Z" fill="currentColor"/></svg>`,
  chatCircle: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><path d="M180,152c0,20-27.4,36-60,36c-8.2,0-16.2-1-24-2.8l-26.9,14.3c-1.5.8-3-1.4-2-3.1l10.3-24.8c-9-9-14.4-21-14.4-35.6c0-20,27.4-36,60-36s60,16,60,36Z" fill="currentColor"/></svg>`,
  chatCircleSimple: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><path d="M80 176l16-30a56 56 0 1 1 24 20Z" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  link: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><path d="M136.41,200.86a59.79,59.79,0,0,1-84.72-84.72l24-24a59.79,59.79,0,0,1,84.72,0" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M119.59,55.14a59.79,59.79,0,0,1,84.72,84.72l-24,24a59.79,59.79,0,0,1-84.72,0" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  linkSimple: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><path d="M136 80h32a48 48 0 0 1 0 96h-32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M120 176H88a48 48 0 1 1 0-96h32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><line x1="96" y1="128" x2="160" y2="128" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>`,
  history: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><polyline points="168 40 168 96 112 96" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M152,56a88,88,0,1,0,88,88" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="128 128 128 80 152 104" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  clockCounterClockwise: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5625 5.62502V8.68151L12.1022 10.2052C12.2301 10.282 12.3223 10.4065 12.3584 10.5513C12.3945 10.6961 12.3717 10.8493 12.2948 10.9772C12.218 11.1051 12.0935 11.1973 11.9487 11.2334C11.8039 11.2696 11.6507 11.2467 11.5228 11.1699L8.71031 9.48236C8.62707 9.43235 8.5582 9.36164 8.51039 9.27712C8.46258 9.19259 8.43747 9.09713 8.4375 9.00002V5.62502C8.4375 5.47584 8.49676 5.33276 8.60225 5.22727C8.70774 5.12178 8.85082 5.06252 9 5.06252C9.14918 5.06252 9.29226 5.12178 9.39775 5.22727C9.50324 5.33276 9.5625 5.47584 9.5625 5.62502ZM9 2.25002C8.11265 2.24781 7.23368 2.42161 6.41394 2.76135C5.59421 3.1011 4.85 3.60004 4.22438 4.22932C3.7132 4.74682 3.25898 5.24463 2.8125 5.76565V4.50002C2.8125 4.35084 2.75324 4.20776 2.64775 4.10227C2.54226 3.99678 2.39918 3.93752 2.25 3.93752C2.10082 3.93752 1.95774 3.99678 1.85225 4.10227C1.74676 4.20776 1.6875 4.35084 1.6875 4.50002V7.31252C1.6875 7.46171 1.74676 7.60478 1.85225 7.71027C1.95774 7.81576 2.10082 7.87502 2.25 7.87502H5.0625C5.21168 7.87502 5.35476 7.81576 5.46025 7.71027C5.56574 7.60478 5.625 7.46171 5.625 7.31252C5.625 7.16334 5.56574 7.02026 5.46025 6.91477C5.35476 6.80928 5.21168 6.75002 5.0625 6.75002H3.44531C3.94805 6.15799 4.44867 5.60041 5.01961 5.02244C5.80138 4.24067 6.7962 3.70662 7.87976 3.48701C8.96332 3.26741 10.0876 3.37198 11.112 3.78767C12.1365 4.20337 13.0157 4.91175 13.6399 5.82429C14.2641 6.73684 14.6055 7.81309 14.6215 8.91856C14.6375 10.024 14.3273 11.1097 13.7298 12.0399C13.1323 12.9702 12.2739 13.7037 11.2619 14.1488C10.2499 14.594 9.12915 14.731 8.0397 14.5429C6.95024 14.3547 5.94039 13.8496 5.13633 13.0908C5.08259 13.04 5.01937 13.0003 4.95029 12.974C4.88121 12.9476 4.80761 12.9351 4.7337 12.9372C4.65979 12.9393 4.58702 12.9559 4.51953 12.9861C4.45205 13.0164 4.39118 13.0596 4.34039 13.1133C4.28961 13.167 4.2499 13.2303 4.22355 13.2993C4.1972 13.3684 4.18471 13.442 4.1868 13.5159C4.18889 13.5898 4.20551 13.6626 4.23573 13.7301C4.26594 13.7976 4.30915 13.8585 4.36289 13.9092C5.16407 14.6653 6.13811 15.2138 7.2 15.5068C8.2619 15.7998 9.37938 15.8285 10.4549 15.5904C11.5304 15.3522 12.5314 14.8545 13.3703 14.1405C14.2092 13.4266 14.8606 12.5182 15.2677 11.4946C15.6748 10.471 15.8252 9.36329 15.7058 8.2682C15.5864 7.1731 15.2008 6.12388 14.5826 5.2121C13.9644 4.30032 13.1324 3.55369 12.1594 3.03737C11.1863 2.52105 10.1016 2.25074 9 2.25002Z" fill="currentColor"/></svg>`,
  dotsThree: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><circle cx="60" cy="128" r="16" fill="currentColor"/><circle cx="128" cy="128" r="16" fill="currentColor"/><circle cx="196" cy="128" r="16" fill="currentColor"/></svg>`,
  smiley: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.4982 6.27665 13.8128 4.62441 12.5942 3.40582C11.3756 2.18722 9.72335 1.50182 8 1.5ZM8 13.5C6.91221 13.5 5.84884 13.1774 4.94437 12.5731C4.0399 11.9687 3.33495 11.1098 2.91867 10.1048C2.50238 9.09977 2.39347 7.9939 2.60568 6.927C2.8179 5.86011 3.34173 4.8801 4.11092 4.11091C4.8801 3.34172 5.86011 2.8179 6.92701 2.60568C7.9939 2.39346 9.09977 2.50238 10.1048 2.91866C11.1098 3.33494 11.9687 4.03989 12.5731 4.94436C13.1774 5.84883 13.5 6.9122 13.5 8C13.4983 9.45818 12.9184 10.8562 11.8873 11.8873C10.8562 12.9184 9.45819 13.4983 8 13.5ZM5 6.75C5 6.60166 5.04399 6.45666 5.1264 6.33332C5.20881 6.20999 5.32595 6.11386 5.46299 6.05709C5.60003 6.00032 5.75084 5.98547 5.89632 6.01441C6.04181 6.04335 6.17544 6.11478 6.28033 6.21967C6.38522 6.32456 6.45665 6.4582 6.48559 6.60368C6.51453 6.74917 6.49968 6.89997 6.44291 7.03701C6.38615 7.17406 6.29002 7.29119 6.16668 7.3736C6.04334 7.45601 5.89834 7.5 5.75 7.5C5.55109 7.5 5.36032 7.42098 5.21967 7.28033C5.07902 7.13968 5 6.94891 5 6.75ZM11.5 6.75C11.5 6.88261 11.4473 7.00979 11.3536 7.10355C11.2598 7.19732 11.1326 7.25 11 7.25H9.5C9.36739 7.25 9.24022 7.19732 9.14645 7.10355C9.05268 7.00979 9 6.88261 9 6.75C9 6.61739 9.05268 6.49021 9.14645 6.39645C9.24022 6.30268 9.36739 6.25 9.5 6.25H11C11.1326 6.25 11.2598 6.30268 11.3536 6.39645C11.4473 6.49021 11.5 6.61739 11.5 6.75ZM10.9325 9.75C10.2894 10.8619 9.22063 11.5 8 11.5C6.77938 11.5 5.71063 10.8625 5.06688 9.75C5.03405 9.69312 5.01274 9.63033 5.00418 9.56522C4.99561 9.50011 4.99996 9.43395 5.01696 9.37051C5.03397 9.30708 5.0633 9.24761 5.10328 9.19552C5.14327 9.14342 5.19312 9.09971 5.25 9.06688C5.30688 9.03404 5.36967 9.01274 5.43478 9.00417C5.4999 8.99561 5.56606 8.99995 5.62949 9.01696C5.69293 9.03396 5.75239 9.06329 5.80449 9.10328C5.85659 9.14327 5.9003 9.19312 5.93313 9.25C6.39938 10.0569 7.13313 10.5 8 10.5C8.86688 10.5 9.60063 10.0562 10.0675 9.25C10.0988 9.19025 10.1418 9.13743 10.194 9.09474C10.2462 9.05205 10.3065 9.02035 10.3712 9.00156C10.436 8.98277 10.5039 8.97728 10.5708 8.98541C10.6378 8.99354 10.7024 9.01513 10.7608 9.04888C10.8191 9.08262 10.8701 9.12783 10.9106 9.18178C10.951 9.23573 10.9801 9.29731 10.9962 9.36281C11.0122 9.4283 11.0149 9.49637 11.0039 9.56291C10.993 9.62945 10.9687 9.69309 10.9325 9.75Z" fill="#14161B"/></svg>`,
  at: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5C6.27609 1.5 4.62279 2.18482 3.40381 3.40381C2.18482 4.62279 1.5 6.27609 1.5 8C1.5 9.72391 2.18482 11.3772 3.40381 12.5962C4.62279 13.8152 6.27609 14.5 8 14.5C9.34438 14.5 10.7562 14.095 11.7769 13.4169C11.8316 13.3805 11.8786 13.3337 11.9152 13.2792C11.9518 13.2247 11.9774 13.1635 11.9903 13.0991C12.0033 13.0347 12.0035 12.9684 11.9908 12.9039C11.9782 12.8395 11.9529 12.7781 11.9166 12.7234C11.8802 12.6687 11.8334 12.6217 11.7789 12.5851C11.7244 12.5485 11.6632 12.5229 11.5988 12.51C11.5344 12.497 11.4681 12.4968 11.4036 12.5095C11.3392 12.5222 11.2778 12.5474 11.2231 12.5837C10.375 13.1487 9.13812 13.5 8 13.5C6.9122 13.5 5.84883 13.1774 4.94436 12.5731C4.03989 11.9687 3.33494 11.1098 2.91866 10.1048C2.50238 9.09977 2.39346 7.9939 2.60568 6.927C2.8179 5.86011 3.34172 4.8801 4.11091 4.11091C4.8801 3.34172 5.86011 2.8179 6.927 2.60568C7.9939 2.39346 9.09977 2.50238 10.1048 2.91866C11.1098 3.33494 11.9687 4.03989 12.5731 4.94436C13.1774 5.84883 13.5 6.9122 13.5 8C13.5 9.65313 12.82 10 12.25 10C11.68 10 11 9.65313 11 8V5.5C11 5.36739 10.9473 5.24021 10.8536 5.14645C10.7598 5.05268 10.6326 5 10.5 5C10.3674 5 10.2402 5.05268 10.1464 5.14645C10.0527 5.24021 10 5.36739 10 5.5V5.76625C9.5513 5.36396 8.99184 5.10612 8.39451 5.02634C7.79718 4.94655 7.18966 5.04852 6.65111 5.31895C6.11255 5.58938 5.66793 6.01573 5.37515 6.54247C5.08238 7.06922 4.95503 7.67192 5.0097 8.27207C5.06437 8.87223 5.29852 9.442 5.68165 9.90718C6.06477 10.3724 6.57912 10.7114 7.15767 10.88C7.73622 11.0487 8.35216 11.0392 8.92525 10.8528C9.49833 10.6664 10.002 10.3117 10.3706 9.835C10.7456 10.585 11.3925 11 12.25 11C13.6588 11 14.5 9.87875 14.5 8C14.4982 6.27665 13.8128 4.62441 12.5942 3.40582C11.3756 2.18722 9.72335 1.50182 8 1.5ZM8 10C7.60444 10 7.21776 9.8827 6.88886 9.66294C6.55996 9.44318 6.30362 9.13082 6.15224 8.76537C6.00087 8.39991 5.96126 7.99778 6.03843 7.60982C6.1156 7.22186 6.30608 6.86549 6.58579 6.58579C6.86549 6.30608 7.22186 6.1156 7.60982 6.03843C7.99778 5.96126 8.39991 6.00087 8.76537 6.15224C9.13082 6.30362 9.44318 6.55996 9.66294 6.88886C9.8827 7.21776 10 7.60444 10 8C10 8.53043 9.78929 9.03914 9.41421 9.41421C9.03914 9.78929 8.53043 10 8 10Z" fill="#14161B"/></svg>`,
  image: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 2.5H2.5C2.23478 2.5 1.98043 2.60536 1.79289 2.79289C1.60536 2.98043 1.5 3.23478 1.5 3.5V12.5C1.5 12.7652 1.60536 13.0196 1.79289 13.2071C1.98043 13.3946 2.23478 13.5 2.5 13.5H13.5C13.7652 13.5 14.0196 13.3946 14.2071 13.2071C14.3946 13.0196 14.5 12.7652 14.5 12.5V3.5C14.5 3.23478 14.3946 2.98043 14.2071 2.79289C14.0196 2.60536 13.7652 2.5 13.5 2.5ZM13.5 3.5V9.92188L11.8706 8.29313C11.7778 8.20024 11.6675 8.12656 11.5462 8.07629C11.4248 8.02602 11.2948 8.00015 11.1634 8.00015C11.0321 8.00015 10.902 8.02602 10.7807 8.07629C10.6594 8.12656 10.5491 8.20024 10.4563 8.29313L9.20625 9.54313L6.45625 6.79313C6.26873 6.60573 6.01448 6.50046 5.74937 6.50046C5.48427 6.50046 5.23002 6.60573 5.0425 6.79313L2.5 9.33562V3.5H13.5ZM2.5 10.75L5.75 7.5L10.75 12.5H2.5V10.75ZM13.5 12.5H12.1644L9.91438 10.25L11.1644 9L13.5 11.3363V12.5ZM9 6.25C9 6.10166 9.04399 5.95666 9.1264 5.83332C9.20881 5.70999 9.32594 5.61386 9.46299 5.55709C9.60003 5.50032 9.75083 5.48547 9.89632 5.51441C10.0418 5.54335 10.1754 5.61478 10.2803 5.71967C10.3852 5.82456 10.4567 5.9582 10.4856 6.10368C10.5145 6.24917 10.4997 6.39997 10.4429 6.53701C10.3861 6.67406 10.29 6.79119 10.1667 6.8736C10.0433 6.95601 9.89834 7 9.75 7C9.55109 7 9.36032 6.92098 9.21967 6.78033C9.07902 6.63968 9 6.44891 9 6.25Z" fill="#14161B"/></svg>`,
  paperclip: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7415 8.60225C14.7938 8.65449 14.8353 8.71653 14.8636 8.78481C14.8919 8.8531 14.9064 8.9263 14.9064 9.00022C14.9064 9.07414 14.8919 9.14734 14.8636 9.21562C14.8353 9.28391 14.7938 9.34595 14.7415 9.39819L8.97232 15.1638C8.23377 15.9023 7.23211 16.3171 6.1877 16.317C5.14329 16.317 4.14169 15.902 3.40322 15.1635C2.66476 14.4249 2.24993 13.4232 2.25 12.3788C2.25007 11.3344 2.66502 10.3328 3.40357 9.59436L10.3828 2.51248C10.9101 1.98465 11.6254 1.6879 12.3715 1.6875C13.1176 1.6871 13.8332 1.9831 14.3611 2.51037C14.8889 3.03765 15.1857 3.75301 15.1861 4.49908C15.1865 5.24515 14.8905 5.96082 14.3632 6.48866L7.38256 13.5705C7.06554 13.8875 6.63558 14.0656 6.18725 14.0656C5.73892 14.0656 5.30895 13.8875 4.99193 13.5705C4.67492 13.2535 4.49682 12.8235 4.49682 12.3752C4.49682 11.9269 4.67492 11.4969 4.99193 11.1799L10.849 5.23006C10.9003 5.17533 10.962 5.13141 11.0305 5.1009C11.0991 5.07038 11.173 5.05388 11.248 5.05237C11.323 5.05086 11.3976 5.06437 11.4673 5.09211C11.537 5.11984 11.6005 5.16124 11.6539 5.21386C11.7074 5.26648 11.7498 5.32927 11.7786 5.39853C11.8075 5.46778 11.8222 5.54211 11.8218 5.61713C11.8215 5.69215 11.8062 5.76635 11.7768 5.83536C11.7474 5.90437 11.7044 5.9668 11.6505 6.01897L5.79279 11.9751C5.74035 12.0272 5.69866 12.089 5.67012 12.1572C5.64158 12.2253 5.62673 12.2984 5.62644 12.3723C5.62615 12.4462 5.64041 12.5194 5.66841 12.5877C5.69641 12.6561 5.7376 12.7183 5.78963 12.7707C5.84166 12.8232 5.90351 12.8649 5.97165 12.8934C6.03979 12.9219 6.11289 12.9368 6.18677 12.9371C6.26064 12.9374 6.33386 12.9231 6.40222 12.8951C6.47059 12.8671 6.53277 12.8259 6.58522 12.7739L13.5651 5.69553C13.8822 5.37917 14.0605 4.94983 14.061 4.50196C14.0614 4.05409 13.884 3.62438 13.5676 3.30737C13.2512 2.99035 12.8219 2.81199 12.374 2.81153C11.9262 2.81107 11.4965 2.98854 11.1794 3.30491L4.20162 10.384C3.94022 10.645 3.73278 10.9549 3.59115 11.296C3.44952 11.6372 3.37648 12.0029 3.37618 12.3723C3.37589 12.7417 3.44835 13.1075 3.58944 13.4489C3.73053 13.7902 3.93747 14.1005 4.19846 14.3619C4.45944 14.6233 4.76936 14.8307 5.11052 14.9724C5.45167 15.114 5.81738 15.187 6.18677 15.1873C6.55615 15.1876 6.92198 15.1152 7.26336 14.9741C7.60474 14.833 7.91498 14.626 8.17639 14.3651L13.9462 8.59944C14.0521 8.4944 14.1953 8.43569 14.3444 8.43622C14.4936 8.43675 14.6364 8.49647 14.7415 8.60225Z" fill="currentColor"/></svg>`,
  gitFork: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 4.49984C15.7498 4.07907 15.6316 3.66678 15.4088 3.30981C15.1861 2.95283 14.8677 2.66548 14.4898 2.48038C14.1119 2.29527 13.6897 2.21984 13.2711 2.26265C12.8525 2.30546 12.4543 2.46479 12.1217 2.72254C11.7891 2.9803 11.5355 3.32615 11.3896 3.72083C11.2437 4.1155 11.2114 4.54318 11.2963 4.95529C11.3813 5.3674 11.5801 5.74743 11.8702 6.05222C12.1603 6.357 12.5301 6.57434 12.9375 6.67953V7.87484C12.9375 8.02403 12.8782 8.1671 12.7728 8.27259C12.6673 8.37808 12.5242 8.43734 12.375 8.43734H5.62501C5.47582 8.43734 5.33275 8.37808 5.22726 8.27259C5.12177 8.1671 5.06251 8.02403 5.06251 7.87484V6.67953C5.59275 6.54262 6.05486 6.21703 6.36222 5.76378C6.66958 5.31053 6.80108 4.76074 6.73207 4.21747C6.66307 3.6742 6.3983 3.17474 5.98739 2.81272C5.57648 2.45071 5.04764 2.25098 4.50001 2.25098C3.95237 2.25098 3.42353 2.45071 3.01262 2.81272C2.60171 3.17474 2.33694 3.6742 2.26794 4.21747C2.19893 4.76074 2.33044 5.31053 2.63779 5.76378C2.94515 6.21703 3.40726 6.54262 3.93751 6.67953V7.87484C3.93751 8.3224 4.1153 8.75162 4.43176 9.06809C4.74823 9.38455 5.17745 9.56234 5.62501 9.56234H8.43751V11.3202C7.90726 11.4571 7.44515 11.7827 7.13779 12.2359C6.83043 12.6892 6.69893 13.2389 6.76794 13.7822C6.83694 14.3255 7.10171 14.8249 7.51262 15.187C7.92353 15.549 8.45237 15.7487 9.00001 15.7487C9.54764 15.7487 10.0765 15.549 10.4874 15.187C10.8983 14.8249 11.1631 14.3255 11.2321 13.7822C11.3011 13.2389 11.1696 12.6892 10.8622 12.2359C10.5549 11.7827 10.0928 11.4571 9.56251 11.3202V9.56234H12.375C12.8226 9.56234 13.2518 9.38455 13.5682 9.06809C13.8847 8.75162 14.0625 8.3224 14.0625 7.87484V6.67953C14.5453 6.55412 14.9729 6.27212 15.2783 5.87768C15.5836 5.48325 15.7495 4.99867 15.75 4.49984ZM3.37501 4.49984C3.37501 4.27734 3.44099 4.05983 3.5646 3.87483C3.68822 3.68982 3.86392 3.54563 4.06949 3.46048C4.27505 3.37533 4.50125 3.35305 4.71948 3.39646C4.93771 3.43987 5.13817 3.54701 5.2955 3.70435C5.45283 3.86168 5.55998 4.06214 5.60339 4.28037C5.6468 4.4986 5.62452 4.7248 5.53937 4.93036C5.45422 5.13593 5.31003 5.31163 5.12502 5.43525C4.94002 5.55886 4.72251 5.62484 4.50001 5.62484C4.20164 5.62484 3.91549 5.50632 3.70451 5.29534C3.49353 5.08436 3.37501 4.79821 3.37501 4.49984ZM10.125 13.4998C10.125 13.7223 10.059 13.9399 9.93541 14.1249C9.81179 14.3099 9.63609 14.4541 9.43052 14.5392C9.22496 14.6244 8.99876 14.6466 8.78053 14.6032C8.5623 14.5598 8.36184 14.4527 8.20451 14.2953C8.04718 14.138 7.94003 13.9375 7.89662 13.7193C7.85321 13.5011 7.87549 13.2749 7.96064 13.0693C8.04579 12.8638 8.18998 12.6881 8.37499 12.5644C8.55999 12.4408 8.7775 12.3748 9.00001 12.3748C9.29837 12.3748 9.58452 12.4934 9.7955 12.7043C10.0065 12.9153 10.125 13.2015 10.125 13.4998ZM13.5 5.62484C13.2775 5.62484 13.06 5.55886 12.875 5.43525C12.69 5.31163 12.5458 5.13593 12.4606 4.93036C12.3755 4.7248 12.3532 4.4986 12.3966 4.28037C12.44 4.06214 12.5472 3.86168 12.7045 3.70435C12.8618 3.54701 13.0623 3.43987 13.2805 3.39646C13.4988 3.35305 13.725 3.37533 13.9305 3.46048C14.1361 3.54563 14.3118 3.68982 14.4354 3.87483C14.559 4.05983 14.625 4.27734 14.625 4.49984C14.625 4.79821 14.5065 5.08436 14.2955 5.29534C14.0845 5.50632 13.7984 5.62484 13.5 5.62484Z" fill="currentColor"/></svg>`,
  send: `<svg width="20" height="20" viewBox="0 0 256 256" fill="none"><polyline points="232 32 104 160 232 32" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/><path d="M232,32,104,160,40,192a16,16,0,0,1-20-20l32-64" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowUp: `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><line x1="128" y1="216" x2="128" y2="56" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><polyline points="56,128 128,56 200,128" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function getAvatarInitials(name) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (parts.length === 0) {
    return "?"
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase()
}

function renderAvatarWithFallback(avatar, wrapperClass, imageClass = "") {
  const safeAvatar = avatar || {}
  const initials = getAvatarInitials(safeAvatar.name)
  const imageClassAttr = imageClass ? ` class="${imageClass}"` : ""

  return `<span class="${wrapperClass}" style="background:${safeAvatar.bg || "#d0d5dd"}"><span class="rr-avatar-fallback">${escapeHtml(initials)}</span>${safeAvatar.url ? `<img src="${safeAvatar.url}" alt=""${imageClassAttr} onerror="this.remove()"/>` : ""}</span>`
}

// Global state for current active tab
let ACTIVE_TAB = "overview"
// Global state for modal
let SELECTED_ISSUE = null
let MODAL_VISIBLE = false
let ISSUE_MODAL_TOOL = "comments"
let ADD_ISSUE_MODAL_VISIBLE = false
let ADD_ISSUE_MODAL_TOOL = "comments"
let ADD_ISSUE_PRIORITY = ""
let ADD_ISSUE_PRIORITY_DROPDOWN_OPEN = false
const BUTTONS = [
  { id: "overview", label: "Overview" },
  { id: "sprint", label: "Test Cases" },
  { id: "regressions", label: "UAT Issues" },
  { id: "production", label: "Production Issues" },
  // Stakeholders tab removed per design — button intentionally omitted
]

const TESTING_HEADER_ACTIONS_ID = "rr-tab-testing-header"
const ADD_ISSUE_REPORTER = { name: "Edward Franz", bg: "#dbd0bd" }
const ADD_ISSUE_PRIORITY_OPTIONS = [
  { id: "urgent", label: "Urgent" },
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
]

function updateTestingHeaderActions() {
  const actionsContainer = document.getElementById(TESTING_HEADER_ACTIONS_ID)
  if (!actionsContainer) {
    return
  }

  actionsContainer.innerHTML = ACTIVE_TAB === "stakeholders"
    ? `<rr-button-icon data-action="open-add-issue-modal" type="primary" size="xs" label="Add stakeholder issue"></rr-button-icon>`
    : ""
}

function renderAddIssueModal() {
  if (!ADD_ISSUE_MODAL_VISIBLE) {
    return ""
  }

  const activeTool = ADD_ISSUE_MODAL_TOOL
  const selectedPriority = ADD_ISSUE_PRIORITY_OPTIONS.find((option) => option.id === ADD_ISSUE_PRIORITY)
  const selectedPriorityLabel = selectedPriority ? selectedPriority.label : "Select priority"
  const isAttachmentsTool = activeTool === "attachments"
  const isDependenciesTool = activeTool === "related"
  const isHistoryTool = activeTool === "history"

  return `
    <div class="rr-modal-overlay">
      <div class="rr-modal-backdrop"></div>
      <div class="rr-modal-container rr-modal-container--add-issue">
        <div class="rr-modal-header rr-add-issue-header">
          <div class="rr-modal-header-title">New task</div>
          <div class="rr-modal-header-actions">
            <button class="rr-modal-action-btn" data-action="close-add-issue-modal-x" title="Close" type="button">
              ${ICON.close}
            </button>
          </div>
        </div>

        <div class="rr-modal-content rr-add-issue-content">
          <div class="rr-modal-main rr-add-issue-main">
            <h2 class="rr-modal-title rr-add-issue-title" contenteditable="true" role="textbox" aria-label="Task title">New task</h2>

            <div class="rr-modal-meta-grid rr-add-issue-meta-grid">
              <div class="rr-modal-meta-item rr-add-issue-priority">
                <div class="rr-modal-meta-label">PRIORITY</div>
                <button class="rr-add-issue-select" data-action="toggle-add-issue-priority" type="button" aria-label="Select priority" aria-haspopup="listbox" aria-expanded="${ADD_ISSUE_PRIORITY_DROPDOWN_OPEN ? "true" : "false"}">
                  <span class="rr-add-issue-select-icon ${ADD_ISSUE_PRIORITY_DROPDOWN_OPEN ? "is-open" : ""}">${ICON.caretDown}</span>
                  <span>${escapeHtml(selectedPriorityLabel)}</span>
                </button>
                ${ADD_ISSUE_PRIORITY_DROPDOWN_OPEN ? `
                  <div class="rr-add-issue-priority-menu" role="listbox" aria-label="Priority options">
                    ${ADD_ISSUE_PRIORITY_OPTIONS.map((option) => `
                      <button
                        class="rr-add-issue-priority-option ${option.id === ADD_ISSUE_PRIORITY ? "is-selected" : ""}"
                        data-action="select-add-issue-priority"
                        data-priority="${option.id}"
                        type="button"
                        role="option"
                        aria-selected="${option.id === ADD_ISSUE_PRIORITY ? "true" : "false"}"
                      >
                        ${escapeHtml(option.label)}
                      </button>
                    `).join("")}
                  </div>
                ` : ""}
              </div>

              <div class="rr-modal-meta-item">
                <div class="rr-modal-meta-label">STATUS</div>
                <span class="rr-add-issue-status">To do</span>
              </div>

              <div class="rr-modal-meta-item">
                <div class="rr-modal-meta-label">ASSIGNEE</div>
                <button class="rr-add-issue-assignee" type="button" aria-label="Select assignee">
                  <span class="rr-add-issue-assignee-icon">${ICON.user}</span>
                  <span>No Assignee</span>
                </button>
              </div>

              <div class="rr-modal-meta-item">
                <div class="rr-modal-meta-label">REPORTER</div>
                <div class="rr-modal-assignee">
                  ${renderAvatarWithFallback(ADD_ISSUE_REPORTER, "rr-modal-avatar-wrap", "rr-modal-avatar")}
                  <span>${escapeHtml(ADD_ISSUE_REPORTER.name)}</span>
                </div>
              </div>
            </div>

            <div class="rr-add-issue-description-block">
              <div class="rr-modal-meta-label">DESCRIPTION</div>
              <textarea class="rr-add-issue-description" placeholder="Add description..." aria-label="Task description"></textarea>
            </div>
          </div>

          <div class="rr-modal-aside rr-add-issue-aside">
            <div class="rr-modal-tools" role="toolbar" aria-label="Add issue tools">
              <button class="rr-modal-tool-btn ${activeTool === "comments" ? "is-active" : ""}" data-action="switch-add-issue-tool" data-tool="comments" type="button" title="Notes">${ICON.notes}</button>
              <button class="rr-modal-tool-btn ${activeTool === "attachments" ? "is-active" : ""}" data-action="switch-add-issue-tool" data-tool="attachments" type="button" title="Attach file">${ICON.paperclip}</button>
              <button class="rr-modal-tool-btn ${activeTool === "related" ? "is-active" : ""}" data-action="switch-add-issue-tool" data-tool="related" type="button" title="Related issues">${ICON.gitFork}</button>
              <button class="rr-modal-tool-btn ${activeTool === "history" ? "is-active" : ""}" data-action="switch-add-issue-tool" data-tool="history" type="button" title="History">${ICON.clockCounterClockwise}</button>
            </div>

            ${isAttachmentsTool ? `
              <div class="rr-add-issue-attachments">
                <div class="rr-add-issue-empty rr-add-issue-empty--attachments">
                  <span class="rr-add-issue-empty-icon" aria-hidden="true">${ICON.paperclip}</span>
                  <p class="rr-add-issue-empty-title">No attachments</p>
                </div>

                <button class="rr-add-issue-dropzone" type="button" title="Attach files">
                  <span class="rr-add-issue-dropzone-icon" aria-hidden="true">${ICON.arrowUp}</span>
                  <span class="rr-add-issue-dropzone-text">Drop files to attach or browse</span>
                </button>

                <div class="rr-add-issue-divider" aria-hidden="true">
                  <span></span>
                  <p>OR</p>
                  <span></span>
                </div>

                <div class="rr-add-issue-link-row">
                  <input class="rr-add-issue-link-input" type="text" placeholder="Paste link to image or video..." aria-label="Attachment link" />
                  <button class="rr-add-issue-link-send" type="button" title="Add link">${ICON.arrowUp}</button>
                </div>
              </div>
            ` : isDependenciesTool ? `
              <div class="rr-add-issue-dependencies">
                <div class="rr-add-issue-empty rr-add-issue-empty--dependencies">
                  <span class="rr-add-issue-empty-icon" aria-hidden="true">${ICON.gitFork}</span>
                  <p class="rr-add-issue-empty-title">No linked issues</p>
                </div>
              </div>
            ` : isHistoryTool ? `
              <div class="rr-add-issue-history">
                <div class="rr-add-issue-empty rr-add-issue-empty--history">
                  <span class="rr-add-issue-empty-icon" aria-hidden="true">${ICON.clockCounterClockwise}</span>
                  <p class="rr-add-issue-empty-title">No history</p>
                </div>
              </div>
            ` : `
              <div class="rr-add-issue-empty">
                <span class="rr-add-issue-empty-icon" aria-hidden="true">${ICON.notes}</span>
                <p class="rr-add-issue-empty-title">No notes</p>
              </div>

              <div class="rr-modal-input-area rr-add-issue-input-area">
                <input type="text" class="rr-modal-input" placeholder="Write a note..." />
                <div class="rr-modal-input-actions">
                  <button class="rr-modal-input-btn" type="button" title="Emoji">${ICON.smiley}</button>
                  <button class="rr-modal-input-btn" type="button" title="Mention">${ICON.at}</button>
                  <button class="rr-modal-input-btn" type="button" title="Add image">${ICON.image}</button>
                  <button class="rr-modal-input-btn rr-modal-input-btn--send" type="button" title="Send">${ICON.arrowUp}</button>
                </div>
              </div>
            `}
          </div>
        </div>

        <div class="rr-add-issue-footer">
          <rr-button variant="neutral" size="sm">Cancel</rr-button>
          <rr-button variant="primary" size="sm" data-action="submit-add-issue">Add Issue</rr-button>
        </div>
      </div>
    </div>
  `
}

/* ── Overview Tab Data (original implementation) ─────────────── */
const STATUS_CONFIG = {
  completed: { label: "Completed", bg: "#ddf7eb", text: "#0e9255" },
  attention: { label: "Needs attention", bg: "#fff3cd", text: "#b45309" },
  failing: { label: "Failing", bg: "#fbd6d6", text: "#c0362d" },
}

const TABLES = [
  {
    id: "stg",
    title: "Staging 13/02/26",
    totalProgress: "97.45%",
    rows: [
      {
        section: "DAS - Dashboard",
        passRate: "100.00%",
        totalTests: "17",
        passed: "17",
        failed: "0",
        blocked: "0",
        progress: "100.00%",
        status: "completed",
      },
      {
        section: "AUT - Login",
        passRate: "99.09%",
        totalTests: "42",
        passed: "41",
        failed: "0",
        blocked: "0",
        progress: "100.00%",
        status: "completed",
      },
      {
        section: "ONB - Onboarding",
        passRate: "100.00%",
        totalTests: "38",
        passed: "38",
        failed: "0",
        blocked: "0",
        progress: "100.00%",
        status: "completed",
      },
      {
        section: "TEM - Team management",
        passRate: "87.54%",
        totalTests: "53",
        passed: "49",
        failed: "3",
        blocked: "1",
        progress: "90.10%",
        status: "attention",
      },
      {
        section: "TRA - Transactions",
        passRate: "98.14%",
        totalTests: "45",
        passed: "43",
        failed: "0",
        blocked: "10",
        progress: "98.14%",
        status: "attention",
      },
    ],
  },
  {
    id: "prod",
    title: "Production 10/02/26",
    totalProgress: "40.99%",
    rows: [
      {
        section: "DAS - Dashboard",
        passRate: "100.00%",
        totalTests: "17",
        passed: "17",
        failed: "0",
        blocked: "0",
        progress: "100.00%",
        status: "completed",
      },
      {
        section: "AUT - Login",
        passRate: "47.37%",
        totalTests: "42",
        passed: "28",
        failed: "0",
        blocked: "0",
        progress: "59.48%",
        status: "attention",
      },
      {
        section: "ONB - Onboarding",
        passRate: "40.09%",
        totalTests: "38",
        passed: "17",
        failed: "0",
        blocked: "0",
        progress: "47.37%",
        status: "attention",
      },
      {
        section: "TEM - Team management",
        passRate: "12.74%",
        totalTests: "53",
        passed: "2",
        failed: "3",
        blocked: "1",
        progress: "12.74%",
        status: "failing",
      },
      {
        section: "TRA - Transactions",
        passRate: "58.36%",
        totalTests: "45",
        passed: "32",
        failed: "0",
        blocked: "10",
        progress: "61.98%",
        status: "attention",
      },
    ],
  },
]

/* ── Sprint Tab Data ─────────────────────────────────────── */
// Track which modules are expanded
const EXPANDED_MODULES = new Set()

const SPRINT_MODULES = [
  {
    id: "AUT-001",
    title: "AUT-001 - User login",
    avatarBg: "#c7b9da",
hasBlocker: true,
    hasFlag: false,
    testCases: [
      {
        id: "TC-001",
        description: "Verify that Export action is available from Merchants list view and opens side panel correctly",
        idBadge: "ID-8456",
        preConditions: "User is logged in as acquirer or provider user with access to Merchants list",
        steps: "1. Navigate to Merchants list view\n2. Locate Export action button\n3. Click Export button\n4. Observe side panel behavior",
        expectedResults: "- Export action is available from the Merchants list view\n- Clicking Export opens a side panel without leaving the list view\n- Side panel slides in from right side smoothly\n- Merchant list remains visible in background",
        result: "blocked",
        uatIssue: "Export action is blocked by permissions",
        uatIssueStatus: "review",
      },
      {
        id: "TC-002",
        description: "Verify that all data type export options are available and selectable",
        idBadge: "ID-8456",
        preConditions: "User is logged in as acquirer or provider user with access to Merchants list",
        steps: "1. Navigate to Merchants list view\n2. Locate Export action button\n3. Click Export button\n4. Observe side panel behavior",
        expectedResults: "- Export action is available from the Merchants list view\n- Clicking Export opens a side panel without leaving the list view\n- Side panel slides in from right side smoothly\n- Merchant list remains visible in background",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-003",
        description: "Verify that filter-based export options work correctly and display applied filters",
        idBadge: "ID-8456",
        preConditions: "User is logged in as acquirer or provider user with access to Merchants list",
        steps: "1. Navigate to Merchants list view\n2. Locate Export action button\n3. Click Export button\n4. Observe side panel behavior",
        expectedResults: "- Export action is available from the Merchants list view\n- Clicking Export opens a side panel without leaving the list view\n- Side panel slides in from right side smoothly\n- Merchant list remains visible in background",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-004",
        description: "Verify that date range options are available and functional for report exports",
        idBadge: "ID-8456",
        preConditions: "User is logged in as acquirer or provider user with access to Merchants list",
        steps: "1. Navigate to Merchants list view\n2. Locate Export action button\n3. Click Export button\n4. Observe side panel behavior",
        expectedResults: "- Export action is available from the Merchants list view\n- Clicking Export opens a side panel without leaving the list view\n- Side panel slides in from right side smoothly\n- Merchant list remains visible in background",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-005",
        description: 'Verify that custom field selection interface displays fields grouped by categories with "Select all" functionality',
        idBadge: "ID-8456",
        preConditions: "User is logged in as acquirer or provider user with access to Merchants list",
        steps: "1. Navigate to Merchants list view\n2. Locate Export action button\n3. Click Export button\n4. Observe side panel behavior",
        expectedResults: "- Export action is available from the Merchants list view\n- Clicking Export opens a side panel without leaving the list view\n- Side panel slides in from right side smoothly\n- Merchant list remains visible in background",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
    ],
  },
  {
    id: "AUT-002",
    title: "AUT-002 - User authentication process",
    avatarBg: "#c7b9da",
    hasBlocker: false,
    hasFlag: true,
    testCases: [
      {
        id: "TC-201",
        description: "Verify login fails with invalid password and displays validation message",
        idBadge: "ID-9201",
        preConditions: "User account exists and is active",
        steps: "1. Open login page\n2. Enter valid email\n3. Enter invalid password\n4. Submit form",
        expectedResults: "- Login is rejected\n- Validation message is shown\n- User remains on login page",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-202",
        description: "Verify account is locked after maximum failed attempts",
        idBadge: "ID-9202",
        preConditions: "Lockout policy is configured",
        steps: "1. Try invalid password repeatedly\n2. Reach maximum attempts\n3. Try one more login",
        expectedResults: "- Account is marked as locked\n- Login is blocked\n- Lockout message is displayed",
        result: "blocked",
        uatIssue: "Lockout timer value not synced with backend policy",
        uatIssueStatus: "todo",
      },
      {
        id: "TC-203",
        description: "Verify successful login redirects user to dashboard",
        idBadge: "ID-9203",
        preConditions: "User has valid credentials",
        steps: "1. Enter valid email and password\n2. Submit form\n3. Observe redirect",
        expectedResults: "- Session is created\n- User is redirected to dashboard\n- Top navigation is visible",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
    ],
  },
  {
    id: "AUT-003",
    title: "AUT-003 - User session management",
    avatarBg: "#c7b9da",
    hasBlocker: false,
    hasFlag: false,
    testCases: [
      {
        id: "TC-301",
        description: "Verify user stays authenticated after page refresh",
        idBadge: "ID-9301",
        preConditions: "User is logged in",
        steps: "1. Open dashboard\n2. Refresh browser tab\n3. Observe session state",
        expectedResults: "- User remains logged in\n- Current page is preserved\n- No extra login prompt appears",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-302",
        description: "Verify expired session redirects user to login page",
        idBadge: "ID-9302",
        preConditions: "Session expiration is configured",
        steps: "1. Log in\n2. Wait for token expiration\n3. Trigger API action",
        expectedResults: "- Request is rejected as unauthorized\n- User is redirected to login\n- Session data is cleared",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-303",
        description: "Verify user can log out from top navigation",
        idBadge: "ID-9303",
        preConditions: "User is logged in",
        steps: "1. Click profile menu\n2. Select Logout\n3. Open protected route URL",
        expectedResults: "- User is redirected to login\n- Protected route is not accessible\n- Session cookie is removed",
        result: "fail",
        uatIssue: "Logout does not clear remember-me cookie in some browsers",
        uatIssueStatus: "review",
      },
    ],
  },
  {
    id: "AUT-004",
    title: "AUT-004 - User password recovery",
    avatarBg: "#c7b9da",
    hasBlocker: false,
    hasFlag: false,
    testCases: [
      {
        id: "TC-401",
        description: "Verify reset password email is sent for registered account",
        idBadge: "ID-9401",
        preConditions: "Email service is available",
        steps: "1. Open forgot password\n2. Enter registered email\n3. Submit form",
        expectedResults: "- Success confirmation is shown\n- Reset email is sent\n- No sensitive user info is exposed",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-402",
        description: "Verify reset link expires after configured time window",
        idBadge: "ID-9402",
        preConditions: "Reset token TTL is configured",
        steps: "1. Request password reset\n2. Wait until link expires\n3. Open reset link",
        expectedResults: "- Expired link page is displayed\n- User is asked to request new link\n- Password is not changed",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-403",
        description: "Verify password strength validation appears on reset form",
        idBadge: "ID-9403",
        preConditions: "User has valid reset token",
        steps: "1. Open reset form\n2. Enter weak password\n3. Submit form",
        expectedResults: "- Validation feedback appears\n- Weak password is rejected\n- Form remains editable",
        result: "blocked",
        uatIssue: "Strength meter does not load on Safari",
        uatIssueStatus: "todo",
      },
    ],
  },
  {
    id: "AUT-005",
    title: "AUT-005 - 2-factor authentication",
    avatarBg: "#c7b9da",
    hasBlocker: false,
    hasFlag: false,
    testCases: [
      {
        id: "TC-501",
        description: "Verify OTP input accepts valid 6-digit code",
        idBadge: "ID-9501",
        preConditions: "2FA is enabled for the user",
        steps: "1. Login with valid credentials\n2. Enter valid OTP\n3. Submit verification",
        expectedResults: "- OTP is accepted\n- Login completes successfully\n- User lands on dashboard",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-502",
        description: "Verify invalid OTP displays error and keeps user on challenge screen",
        idBadge: "ID-9502",
        preConditions: "2FA challenge screen is displayed",
        steps: "1. Enter invalid OTP\n2. Submit verification\n3. Observe error state",
        expectedResults: "- OTP is rejected\n- Error message is visible\n- Retry remains available",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
      {
        id: "TC-503",
        description: "Verify backup code can be used when OTP device is unavailable",
        idBadge: "ID-9503",
        preConditions: "User has generated backup codes",
        steps: "1. Select backup code option\n2. Enter unused backup code\n3. Submit verification",
        expectedResults: "- Backup code is accepted\n- User is authenticated\n- Used backup code cannot be reused",
        result: "fail",
        uatIssue: "Used backup codes remain valid after successful login",
        uatIssueStatus: "review",
      },
      {
        id: "TC-504",
        description: "Verify resend OTP action is rate limited",
        idBadge: "ID-9504",
        preConditions: "User is on OTP challenge screen",
        steps: "1. Click Resend OTP repeatedly\n2. Observe button and response\n3. Check cooldown timer",
        expectedResults: "- Resend is throttled\n- Cooldown message is shown\n- New OTP is issued after cooldown",
        result: "pass",
        uatIssue: "-",
        uatIssueStatus: null,
      },
    ],
  },
]

/* ══════════════════════════════════════════════════════════════
   Regressions Tab
   Matches Figma "Desktop - 43" (471:52909)
   ══════════════════════════════════════════════════════════════ */
let REGRESSIONS_DONE_COLLAPSED = false

/* ══════════════════════════════════════════════════════════════
   Production Issues Tab
   Matches Figma "Desktop - 44" (471:54619)
   ══════════════════════════════════════════════════════════════ */
let PRODUCTION_DONE_COLLAPSED = false
let STAKEHOLDERS_DONE_COLLAPSED = false

const REG_AVATAR = {
  alisa:   { url: "http://localhost:3845/assets/4507a3162dffac2d85eeb6e31d1a15c57091a204.png", bg: "#c7b9da", name: "Alisa Brown" },
  kate:    { url: "http://localhost:3845/assets/2f1190870d753151f58657595136f67c584b5c8c.png", bg: "#c7b9da", name: "Kate Morrison" },
  kate2:   { url: "http://localhost:3845/assets/6ec94186cc6e3e60f69ecac1443984f93e6078eb.png", bg: "#dbc0dd", name: "Kate Fox" },
  orlando: { url: "http://localhost:3845/assets/555cb3735701db8d4318f0d93edd1f4b64493b37.png", bg: "#cfc3a7", name: "Orlando Diggs" },
  lana:    { url: "http://localhost:3845/assets/d688ab8bff2aebfc3cab587865468c4713ecad78.png", bg: "#d4b5ad", name: "Lana Steiner" },
  phoenix: { url: "http://localhost:3845/assets/2780e16db1a4a364d3d872737f7fe9563d7abb29.png", bg: "#aa9c75", name: "Phoenix Baker" },
  candice: { url: "http://localhost:3845/assets/504bc691102d8a6217d1fc1f8e79a810b1842a0d.png", bg: "#a2a8cd", name: "Candice Wu" },
  demi:    { url: "http://localhost:3845/assets/c9b5ff46a30dabca6ca1e017e1047cd06f04270b.png", bg: "#bea887", name: "Demi Wilkinson" },
  drew:    { url: "http://localhost:3845/assets/2e2cf1b6f441c6f28c3b0e1e0eb4863eb80b7401.png", bg: "#d1dfc3", name: "Drew Cano" },
  loki:    { url: "http://localhost:3845/assets/d4b04f99db960f52b2cf64f40f4e56eb5cd841e3.png", bg: "#f0f1f3", name: "Loki Hayes" },
  noah:    { url: "http://localhost:3845/assets/ab41a74aead9e7cb47a87ad793df9b09ed9d1ea5.png", bg: "#f0f1f3", name: "Noah Bennett" },
  lucy:    { url: "http://localhost:3845/assets/cc20770e67dac754b967ba908e8faaf230d75581.png", bg: "#dbc0dd", name: "Lucy Mendez" },
  brooklyn: { url: "http://localhost:3845/assets/6ec94186cc6e3e60f69ecac1443984f93e6078eb.png", bg: "#dbc0dd", name: "Brooklyn Simmons" },
  rene:    { url: "http://localhost:3845/assets/555cb3735701db8d4318f0d93edd1f4b64493b37.png", bg: "#cfc3a7", name: "Rene Wells" },
}

const ISSUE_MODAL_ATTACHMENTS = [
  {
    url: "http://localhost:3845/assets/b32a89c46b368fe66c10652698fb8fea4d31a63f.png",
    type: "video",
  },
  {
    url: "http://localhost:3845/assets/5eb09a579a993a8c98c5d0be927ff09114216df8.png",
    type: "image",
  },
  {
    url: "http://localhost:3845/assets/205aa03909fb9337568d32d68be65044d4bb2512.png",
    type: "image",
  },
  {
    url: "http://localhost:3845/assets/76024a0393388402b643f98a5d90a7f5a9262c20.png",
    type: "image",
  },
]

const ISSUE_MODAL_PLAY_BG = "http://localhost:3845/assets/3df5e28ae1564c866cea2734eeb2cd98435a7846.svg"
const ISSUE_MODAL_HISTORY_AVATAR_RENE = "http://localhost:3845/assets/501bde5384c13a2e469fcc8407daa6da0960c687.png"
const ISSUE_MODAL_HISTORY_AVATAR_LANA = "http://localhost:3845/assets/30d4a462ea7b6e1428ffcb7ed5d646ca522e5a23.png"
const ISSUE_MODAL_HISTORY_AVATAR_ORLANDO = "http://localhost:3845/assets/05be041b58b5e1fe37be4a6bb5a74f76d7c0f06d.png"

/* ── Issue Details & Comments Data ──────────────────────── */
const ISSUE_DETAILS_MAP = {
  "Document access denied.": {
    scope: "STG",
    priority: "urgent",
    status: "review",
    reporter: { ...REG_AVATAR.rene, name: "Rene Wells" },
    assignee: { ...REG_AVATAR.orlando, name: "Orlando Diggs" },
    description: "Users with valid access permissions receive an \"Access Denied\" error when attempting to open certain documents via direct URL or from the document list view.\n\nSteps to Reproduce:\n1. Log in as a user with the \"Editor\" role.\n2. Navigate to the Documents page.\n3. Select a document assigned to the user's group.\n4. Click the document title OR open the document via direct URL.\n\nExpected Result\nThe document opens successfully and displays its content.\n\nActual Result\nThe user receives a 403 Access Denied error page.\n\nIn some cases:\n- No error message is shown.\n- The user is redirected to the dashboard without explanation.",
    comments: [
      {
        author: "Brooklyn Simmons",
        avatar: REG_AVATAR.brooklyn,
        timestamp: "5 days ago",
        text: "To clarify with stakeholder.",
      },
      {
        author: "Demi Wilkinson",
        avatar: REG_AVATAR.demi,
        timestamp: "2 days ago",
        text: "This part need an update due to technical constraints.",
      },
    ],
    relatedIssues: [
      {
        scope: "STG",
        title: "Document upload issue",
      },
      {
        scope: "STG",
        title: "Document not accessible",
      },
    ],
    history: [
      {
        date: "19/02/26",
        event: "Ready for review",
        author: "Orlando Diggs",
        avatar: {
          url: ISSUE_MODAL_HISTORY_AVATAR_ORLANDO,
          bg: "#cfc3a7",
        },
      },
      {
        date: "17/02/26",
        event: "Added Orlando Diggs as assignee",
        author: "Lana Steiner",
        avatar: {
          url: ISSUE_MODAL_HISTORY_AVATAR_LANA,
          bg: "#d4b5ad",
        },
      },
      {
        date: "14/02/26",
        event: "Issue created",
        author: "Rene Wells",
        avatar: {
          url: ISSUE_MODAL_HISTORY_AVATAR_RENE,
          bg: "#dfcc9f",
        },
      },
    ],
  },
  "Document version mismatch.": {
    description: "Uploaded documents show an outdated or incorrect version label after sync, causing reviewers to validate against stale content.",
    comments: [
      {
        author: "Brooklyn Simmons",
        avatar: REG_AVATAR.brooklyn,
        timestamp: "5 days ago",
        text: "To clarify with stakeholder.",
      },
      {
        author: "Demi Wilkinson",
        avatar: REG_AVATAR.demi,
        timestamp: "2 days ago",
        text: "This part need an update due to technical constraints.",
      },
    ],
  },
  "Document upload failed.": {
    description: "Valid files intermittently fail during upload and return a generic error, preventing users from completing submission workflows.",
  },
  "Document missing metadata.": {
    description: "Required metadata fields are dropped during processing, so documents appear incomplete in detail and search views.",
  },
  "Document format error.": {
    description: "Files that match supported formats are rejected by front-end validation due to incorrect type detection rules.",
  },
  "Document corrupted.": {
    description: "Downloaded or previewed files contain broken content after conversion, indicating corruption in the processing pipeline.",
  },
  "Document missing.": {
    description: "Recently uploaded documents disappear from list and detail screens, even though the upload flow reports success.",
  },
  "Document upload issue.": {
    description: "The upload panel becomes unstable after file selection, causing retries and duplicate submissions for end users.",
  },
  "Document not accessible.": {
    description: "Users can see a document entry but cannot open it from list or direct link due to access checks failing unexpectedly.",
  },
  "Issue with file upload for the document.": {
    description: "Uploading documents is unreliable under normal network conditions, with progress stalling before completion.",
  },
  "Payment Processing Failure": {
    description: "Payments fail during final authorization in staging, resulting in incomplete transactions and reconciliation gaps.",
  },
  "Delayed Payment Processing": {
    description: "Payment confirmation is delayed far beyond expected SLA, leaving users without timely status updates.",
  },
  "Authentication token expired on refresh.": {
    description: "Refreshing an active session invalidates the auth token too early, forcing unexpected re-authentication.",
    comments: [
      {
        author: "Brooklyn Simmons",
        avatar: REG_AVATAR.brooklyn,
        timestamp: "5 days ago",
        text: "To clarify with stakeholder.",
      },
      {
        author: "Demi Wilkinson",
        avatar: REG_AVATAR.demi,
        timestamp: "2 days ago",
        text: "This part need an update due to technical constraints.",
      },
    ],
  },
  "User session ends unexpectedly mid-flow.": {
    description: "User sessions terminate during active workflows, causing unsaved progress and repeated task entry.",
  },
  "API rate limiter blocking valid requests.": {
    description: "Rate limiting thresholds are overly aggressive and block legitimate burst traffic from normal product usage.",
  },
  "Payment gateway timeout on high load.": {
    description: "Gateway calls time out during traffic spikes, which leaves payment attempts pending or failed without clear recovery.",
  },
  "Dashboard widget fails to render on Safari.": {
    description: "Specific dashboard widgets fail to mount in Safari due to browser compatibility issues in rendering logic.",
  },
  "Push notifications not delivered to iOS.": {
    description: "iOS devices do not receive push alerts consistently, even when notification events are generated successfully.",
  },
  "Export report hangs on large datasets.": {
    description: "Export generation stalls for large data ranges, causing long waits and incomplete report downloads.",
  },
  "Search index out of sync after data import.": {
    description: "Recently imported records are missing from search because index refresh jobs are not completing in sequence.",
  },
  "Role permissions not enforced on API level.": {
    description: "Some restricted API endpoints can be accessed with insufficient roles, creating authorization risk.",
  },
  "Data sync delay between staging and prod.": {
    description: "Cross-environment synchronization is delayed, so production data reflects stale states from staging updates.",
  },
  "Login redirect loop on mobile devices.": {
    description: "Mobile login repeatedly redirects between auth pages instead of completing sign-in and landing on the app.",
  },
  "Account creation email not delivered.": {
    description: "New account verification emails are not sent for some sign-ups, blocking activation for affected users.",
  },
  "Dashboard metrics not loading for external users.": {
    description: "External stakeholder accounts see empty dashboard metric cards because API responses fail entitlement checks.",
    comments: [
      {
        author: "Brooklyn Simmons",
        avatar: REG_AVATAR.brooklyn,
        timestamp: "5 days ago",
        text: "To clarify with stakeholder.",
      },
      {
        author: "Demi Wilkinson",
        avatar: REG_AVATAR.demi,
        timestamp: "2 days ago",
        text: "This part need an update due to technical constraints.",
      },
    ],
  },
  "Stakeholder report export generates empty file.": {
    description: "Report exports complete successfully but produce empty files when filters include stakeholder-specific scopes.",
  },
  "User role permissions not applied after update.": {
    description: "Role changes made in admin settings are not applied immediately, leaving users with outdated access rights.",
  },
  "Notification emails delayed by over 24 hours.": {
    description: "System notifications are queued too long and arrive more than a day late, reducing communication reliability.",
  },
  "Portfolio overview page crashes on mobile.": {
    description: "The portfolio overview screen crashes on mobile browsers when loading cards with mixed data states.",
  },
  "Approval workflow skips required sign-off step.": {
    description: "Approval automation bypasses a mandatory sign-off stage, allowing items to progress without full validation.",
  },
  "Audit log entries missing for bulk actions.": {
    description: "Bulk operations are not consistently recorded in audit logs, creating traceability gaps for compliance reviews.",
  },
  "Session timeout too aggressive for guest users.": {
    description: "Guest sessions expire too quickly during normal activity, interrupting users before they finish assigned tasks.",
  },
  "Comment thread collapses unexpectedly on refresh.": {
    description: "Refreshing the page resets comment thread expansion state and hides active context users were reviewing.",
  },
  "Search results incomplete for filtered queries.": {
    description: "Filtered searches return partial result sets because combined filter logic excludes valid matching records.",
  },
  "SSO login fails for external stakeholder accounts.": {
    description: "External stakeholder users encounter authentication errors during SSO handshake and cannot access the portal.",
  },
  "Data export includes archived records incorrectly.": {
    description: "Exported datasets include archived items even when archive filters are disabled, causing reporting inaccuracies.",
  },
}

const REGRESSION_ROWS = [
  { scope: "FE",    issue: "Document version mismatch.",               issueSub: "DEV | 200 KB file validation error.",         priority: "urgent", date: "07/02/26", assignees: [REG_AVATAR.kate2],                                    statusStaging: "merged",     statusProd: "todo"   },
  { scope: "FE",    issue: "Document access denied.",                  issueSub: "DEV | 200 KB file format not supported.",     priority: "urgent", date: "07/02/26", assignees: [REG_AVATAR.orlando],                                  statusStaging: "review",     statusProd: "todo",   _regression: true },
  { scope: "BE",    issue: "Document upload failed.",                  issueSub: "PROD | 200 KB file exceeds allowed size.",    priority: "high",   date: "08/02/26", assignees: [REG_AVATAR.lana],                                     statusStaging: "review",     statusProd: "todo"   },
  { scope: "BE",    issue: "Document missing metadata.",               issueSub: "PROD | 200 KB file upload timeout.",          priority: "high",   date: "12/02/26", assignees: [REG_AVATAR.phoenix],                                  statusStaging: "inprogress", statusProd: "todo"   },
  { scope: "FE",    issue: "Document format error.",                   issueSub: "STG | 200 KB file not processing correctly.", priority: "high",   date: "12/02/26", assignees: [REG_AVATAR.candice],                                  statusStaging: "inprogress", statusProd: "todo"   },
  { scope: "BE",    issue: "Document corrupted.",                      issueSub: "",                                            priority: "medium", date: "12/02/26", assignees: [REG_AVATAR.kate2, REG_AVATAR.orlando],                statusStaging: "merged",     statusProd: "todo",   _regression: true },
  { scope: "FE",    issue: "Document missing.",                        issueSub: "",                                            priority: "medium", date: "12/02/26", assignees: [REG_AVATAR.lana],                                     statusStaging: "merged",     statusProd: "todo"   },
  { scope: "FE",    issue: "Document upload issue.",                   issueSub: "",                                            priority: "medium", date: "08/02/26", assignees: [REG_AVATAR.phoenix],                                  statusStaging: "error",      statusProd: "todo"   },
  { scope: "BE&FE", issue: "Document not accessible.",                 issueSub: "",                                            priority: "low",    date: "13/02/26", assignees: [REG_AVATAR.candice],                                  statusStaging: "todo",       statusProd: "todo"   },
  { scope: "BE&FE", issue: "Issue with file upload for the document.", issueSub: "",                                            priority: "low",    date: "08/02/26", assignees: [REG_AVATAR.candice, REG_AVATAR.demi, REG_AVATAR.drew], statusStaging: "todo",       statusProd: "todo"   },
]

const REGRESSION_DONE_ROWS = [
  { scope: "Devops", issue: "Payment Processing Failure", issueSub: "", priority: "medium", date: "12/02/26", assignees: [REG_AVATAR.lana, REG_AVATAR.demi, REG_AVATAR.candice], statusStaging: "done", statusProd: "todo" },
  { scope: "FE",     issue: "Delayed Payment Processing", issueSub: "", priority: "medium", date: "12/02/26", assignees: [REG_AVATAR.candice, REG_AVATAR.demi, REG_AVATAR.drew],  statusStaging: "done", statusProd: "done", _regression: true },
]

const PRODUCTION_ROWS = [
  { scope: "FE",    issue: "Authentication token expired on refresh.",    issueSub: "", priority: "urgent", date: "07/02/26", assignees: [REG_AVATAR.kate2],                                    statusStaging: "merged",     statusProd: "todo"   },
  { scope: "FE",    issue: "User session ends unexpectedly mid-flow.",    issueSub: "", priority: "urgent", date: "07/02/26", assignees: [REG_AVATAR.orlando],                                  statusStaging: "review",     statusProd: "todo"   },
  { scope: "BE",    issue: "API rate limiter blocking valid requests.",   issueSub: "", priority: "high",   date: "08/02/26", assignees: [REG_AVATAR.lana],                                     statusStaging: "review",     statusProd: "todo",   _regression: true },
  { scope: "BE",    issue: "Payment gateway timeout on high load.",       issueSub: "", priority: "high",   date: "12/02/26", assignees: [REG_AVATAR.phoenix],                                  statusStaging: "inprogress", statusProd: "todo"   },
  { scope: "FE",    issue: "Dashboard widget fails to render on Safari.", issueSub: "", priority: "high",   date: "12/02/26", assignees: [REG_AVATAR.candice],                                  statusStaging: "inprogress", statusProd: "todo"   },
  { scope: "BE",    issue: "Push notifications not delivered to iOS.",    issueSub: "", priority: "medium", date: "12/02/26", assignees: [REG_AVATAR.kate2, REG_AVATAR.orlando],                statusStaging: "merged",     statusProd: "todo",   _regression: true },
  { scope: "FE",    issue: "Export report hangs on large datasets.",      issueSub: "", priority: "medium", date: "12/02/26", assignees: [REG_AVATAR.lana],                                     statusStaging: "merged",     statusProd: "todo",   _regression: true },
  { scope: "FE",    issue: "Search index out of sync after data import.", issueSub: "", priority: "medium", date: "08/02/26", assignees: [REG_AVATAR.phoenix],                                  statusStaging: "error",      statusProd: "todo"   },
  { scope: "BE&FE", issue: "Role permissions not enforced on API level.", issueSub: "", priority: "low",    date: "13/02/26", assignees: [REG_AVATAR.candice],                                  statusStaging: "todo",       statusProd: "todo"   },
  { scope: "BE&FE", issue: "Data sync delay between staging and prod.",   issueSub: "", priority: "low",    date: "08/02/26", assignees: [REG_AVATAR.candice, REG_AVATAR.demi, REG_AVATAR.drew], statusStaging: "todo",       statusProd: "todo"   },
]

const PRODUCTION_DONE_ROWS = [
  { scope: "Devops", issue: "Login redirect loop on mobile devices.",   issueSub: "", priority: "medium", date: "12/02/26", assignees: [REG_AVATAR.lana, REG_AVATAR.demi, REG_AVATAR.candice], statusStaging: "done", statusProd: "todo" },
  { scope: "FE",     issue: "Account creation email not delivered.",    issueSub: "", priority: "medium", date: "12/02/26", assignees: [REG_AVATAR.candice, REG_AVATAR.demi, REG_AVATAR.drew],  statusStaging: "done", statusProd: "done" },
]

const STAKEHOLDERS_ROWS = [
  { issue: "Dashboard metrics not loading for external users.",   priority: "urgent", date: "07/02/26", reporter: REG_AVATAR.alisa,  assignees: [REG_AVATAR.kate2],                     statusStaging: "merged",     statusProd: "todo" },
  { issue: "Stakeholder report export generates empty file.",     priority: "urgent", date: "07/02/26", reporter: REG_AVATAR.loki,   assignees: [REG_AVATAR.orlando],                   statusStaging: "review",     statusProd: "todo" },
  { issue: "User role permissions not applied after update.",     priority: "high",   date: "08/02/26", reporter: REG_AVATAR.loki,   assignees: [REG_AVATAR.lana],                      statusStaging: "review",     statusProd: "todo" },
  { issue: "Notification emails delayed by over 24 hours.",       priority: "high",   date: "12/02/26", reporter: REG_AVATAR.loki,   assignees: [REG_AVATAR.phoenix],                   statusStaging: "inprogress", statusProd: "todo" },
  { issue: "Portfolio overview page crashes on mobile.",          priority: "high",   date: "12/02/26", reporter: REG_AVATAR.noah,   assignees: [REG_AVATAR.candice],                   statusStaging: "inprogress", statusProd: "todo" },
  { issue: "Approval workflow skips required sign-off step.",     priority: "medium", date: "12/02/26", reporter: REG_AVATAR.lucy,   assignees: [REG_AVATAR.lana, REG_AVATAR.demi],     statusStaging: "merged",     statusProd: "todo" },
  { issue: "Audit log entries missing for bulk actions.",         priority: "medium", date: "12/02/26", reporter: REG_AVATAR.lucy,   assignees: [REG_AVATAR.lana],                      statusStaging: "merged",     statusProd: "todo" },
  { issue: "Session timeout too aggressive for guest users.",     priority: "medium", date: "08/02/26", reporter: REG_AVATAR.lucy,   assignees: [REG_AVATAR.drew],                      statusStaging: "error",      statusProd: "todo" },
  { issue: "Comment thread collapses unexpectedly on refresh.",   priority: "low",    date: "13/02/26", reporter: REG_AVATAR.lucy,   assignees: [REG_AVATAR.phoenix],                   statusStaging: "todo",       statusProd: "todo" },
  { issue: "Search results incomplete for filtered queries.",     priority: "low",    date: "08/02/26", reporter: REG_AVATAR.lucy,   assignees: [REG_AVATAR.demi, REG_AVATAR.candice],  statusStaging: "todo",       statusProd: "todo" },
]

const STAKEHOLDERS_DONE_ROWS = [
  { issue: "SSO login fails for external stakeholder accounts.", priority: "medium", date: "12/02/26", reporter: REG_AVATAR.alisa, assignees: [REG_AVATAR.lana, REG_AVATAR.demi, REG_AVATAR.candice], statusStaging: "done", statusProd: "todo" },
  { issue: "Data export includes archived records incorrectly.", priority: "medium", date: "12/02/26", reporter: REG_AVATAR.alisa, assignees: [REG_AVATAR.lana, REG_AVATAR.demi, REG_AVATAR.candice], statusStaging: "done", statusProd: "done" },
]

// Choose 5 random stakeholder issues to show the icon for (stable for session)
function pickRandomN(arr, n) {
  const unique = Array.from(new Set(arr))
  const src = unique.slice()
  const out = []
  while (out.length < n && src.length > 0) {
    const i = Math.floor(Math.random() * src.length)
    out.push(src.splice(i, 1)[0])
  }
  return out
}

const STAKEHOLDERS_ICON_ISSUES = new Set(
  pickRandomN(
    [...STAKEHOLDERS_ROWS.map(r => r.issue || ""), ...STAKEHOLDERS_DONE_ROWS.map(r => r.issue || "")],
    5
  )
)
// Always show the stakeholders change-request icon for these important issues
STAKEHOLDERS_ICON_ISSUES.add("Authentication token expired on refresh.")
STAKEHOLDERS_ICON_ISSUES.add("Document upload failed.")

/* ── Regressions Render Helpers ──────────────────────────────── */
const REG_PRIORITY_ICONS = {
  urgent: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><polyline points="48,192 128,112 208,192" stroke="#e14040" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><polyline points="48,128 128,48 208,128" stroke="#e14040" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  high:   `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><polyline points="48,172 128,92 208,172" stroke="#e14040" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  medium: `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><line x1="40" y1="100" x2="216" y2="100" stroke="#f79009" stroke-width="20" stroke-linecap="round"/><line x1="40" y1="156" x2="216" y2="156" stroke="#f79009" stroke-width="20" stroke-linecap="round"/></svg>`,
  low:    `<svg width="18" height="18" viewBox="0 0 256 256" fill="none"><polyline points="48,84 128,164 208,84" stroke="#0e9255" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}

const REG_PRIORITY_LABELS = { urgent: "Urgent", high: "High", medium: "Medium", low: "Low" }

const REG_GITHUB_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`

const REG_STATUS_CFG = {
  merged:     { label: "Merged",           bg: "#fbc6cd", color: "#d13245" },
  review:     { label: "Ready for review", bg: "#eee3f6", color: "#9b5bce" },
  inprogress: { label: "In progress",      bg: "#daebff", color: "#0067da" },
  todo:       { label: "To do",            bg: "#e0e2e7", color: "#3d4350" },
  error:      { label: "Error",            bg: "#fcdad7", color: "#c0362d" },
  done:       { label: "Done",             bg: "#ddf7eb", color: "#0e9255" },
}

const REG_SCOPE_CFG = {
  "FE":    { bg: "#fef4e6", color: "#f79009" },
  "BE":    { bg: "#e0e2e7", color: "#3d4350" },
  "BE&FE": { bg: "#e0e2e7", color: "#3d4350" },
  "Devops":{ bg: "#eee3f6", color: "#9b5bce" },
}

function renderRegScope(scope) {
  const cfg = REG_SCOPE_CFG[scope.label || scope] || REG_SCOPE_CFG["FE"];
  return `<span class="rr-reg-scope" style="background:${cfg.bg};color:${cfg.color}">${escapeHtml(scope.label || scope)}</span>`;
}

function renderRegStatus(key) {
  const cfg = REG_STATUS_CFG[key] || REG_STATUS_CFG.todo
  return `<span class="rr-reg-status" style="background:${cfg.bg};color:${cfg.color}">${escapeHtml(cfg.label)}</span>`
}

function renderRegPriority(key) {
  return `<span class="rr-reg-priority">${REG_PRIORITY_ICONS[key] || ""}${escapeHtml(REG_PRIORITY_LABELS[key] || key)}</span>`
}

function renderRegAvatarGroup(assignees) {
  return `<div class="rr-reg-avatar-group">${
    assignees.map(av =>
      renderAvatarWithFallback(av, "rr-reg-avatar")
    ).join("")
  }</div>`
}

function renderRegTableHeader() {
  const sortIcon = `<svg width="12" height="12" viewBox="0 0 256 256" fill="none"><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="24" stroke-linecap="round"/><polyline points="56,144 128,216 200,144" stroke="currentColor" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  return `
    <div class="rr-reg-row rr-reg-row--header">
      <div class="rr-reg-cell rr-reg-cell--icon" aria-hidden="true"></div>
      <div class="rr-reg-cell rr-reg-cell--issue">Issue</div>
      <div class="rr-reg-cell rr-reg-cell--scope">Scope</div>
      <div class="rr-reg-cell rr-reg-cell--priority">Priority ${sortIcon}</div>
      <div class="rr-reg-cell rr-reg-cell--date">Date</div>
      <div class="rr-reg-cell rr-reg-cell--assignee">Assignee</div>
      <div class="rr-reg-cell rr-reg-cell--pr">PR Link</div>
      <div class="rr-reg-cell rr-reg-cell--status rr-reg-cell--status-stg">Status Staging</div>
      <div class="rr-reg-cell rr-reg-cell--status rr-reg-cell--status-prod">Status Production</div>
    </div>`
}

function renderRegRow(row) {
  return `
    <div class="rr-reg-row" data-action="open-issue-modal" data-issue='${JSON.stringify(row).replace(/'/g, "\\'") }'>
      <div class="rr-reg-cell rr-reg-cell--icon">
        ${row._regression ? `
        <span class="rr-reg-icon" title="Regression" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm23.09-75.79A32,32,0,0,0,136,80H104a8,8,0,0,0-8,8v80a8,8,0,0,0,16,0V144h22.39l19,28.44a8,8,0,0,0,13.32-8.88ZM112,96h24a16,16,0,0,1,0,32H112Z"></path></svg>
        </span>
        ` : ""}
        ${STAKEHOLDERS_ICON_ISSUES.has(row.issue) ? `
          <span class="rr-reg-icon" title="Change Request" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM96,128a32,32,0,0,0,57.6,19.2,8,8,0,0,1,12.8,9.61,48,48,0,1,1,0-57.62,8,8,0,0,1-12.8,9.61A32,32,0,0,0,96,128Z"></path></svg>
          </span>
        ` : ""}
      </div>
      <div class="rr-reg-cell rr-reg-cell--issue">
        <span class="rr-reg-issue-title">${escapeHtml(row.issue)}</span>
      </div>
      <div class="rr-reg-cell rr-reg-cell--scope">${renderRegScope({ label: row.scope, _regression: row._regression || false })}</div>
      <div class="rr-reg-cell rr-reg-cell--priority">${renderRegPriority(row.priority)}</div>
      <div class="rr-reg-cell rr-reg-cell--date">${escapeHtml(row.date)}</div>
      <div class="rr-reg-cell rr-reg-cell--assignee">${renderRegAvatarGroup(row.assignees)}</div>
      <div class="rr-reg-cell rr-reg-cell--pr">
        <button class="rr-reg-github-btn" type="button" title="View PR">${REG_GITHUB_ICON}</button>
      </div>
      <div class="rr-reg-cell rr-reg-cell--status rr-reg-cell--status-stg">${renderRegStatus(row.statusStaging)}</div>
      <div class="rr-reg-cell rr-reg-cell--status rr-reg-cell--status-prod">${renderRegStatus(row.statusProd)}</div>
    </div>`
}

function renderRegDoneRow(row) {
  return `
    <div class="rr-reg-row" data-action="open-issue-modal" data-issue='${JSON.stringify(row).replace(/'/g, "\\'") }'>
      <div class="rr-reg-cell rr-reg-cell--icon">
        ${row._regression ? `
        <span class="rr-reg-icon" title="Regression" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm23.09-75.79A32,32,0,0,0,136,80H104a8,8,0,0,0-8,8v80a8,8,0,0,0,16,0V144h22.39l19,28.44a8,8,0,0,0,13.32-8.88ZM112,96h24a16,16,0,0,1,0,32H112Z"></path></svg>
        </span>
        ` : ""}
        ${STAKEHOLDERS_ICON_ISSUES.has(row.issue) ? `
          <span class="rr-reg-icon" title="Change Request" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM96,128a32,32,0,0,0,57.6,19.2,8,8,0,0,1,12.8,9.61,48,48,0,1,1,0-57.62,8,8,0,0,1-12.8,9.61A32,32,0,0,0,96,128Z"></path></svg>
          </span>
        ` : ""}
      </div>
      <div class="rr-reg-cell rr-reg-cell--issue">
        <span class="rr-reg-issue-title">${escapeHtml(row.issue)}</span>
      </div>
      <div class="rr-reg-cell rr-reg-cell--scope">${renderRegScope({ label: row.scope, _regression: row._regression || false })}</div>
      <div class="rr-reg-cell rr-reg-cell--priority">${renderRegPriority(row.priority)}</div>
      <div class="rr-reg-cell rr-reg-cell--date">${escapeHtml(row.date)}</div>
      <div class="rr-reg-cell rr-reg-cell--assignee"></div>
      <div class="rr-reg-cell rr-reg-cell--pr">
        <button class="rr-reg-github-btn" type="button" title="View PR">${REG_GITHUB_ICON}</button>
      </div>
      <div class="rr-reg-cell rr-reg-cell--status rr-reg-cell--status-stg">${renderRegStatus(row.statusStaging)}</div>
      <div class="rr-reg-cell rr-reg-cell--status rr-reg-cell--status-prod">${renderRegStatus(row.statusProd)}</div>
    </div>`
}

function renderRegressionsTab() {
  const chevronDown = `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const chevronRight = `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="96,48 176,128 96,208" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const doneChevron = REGRESSIONS_DONE_COLLAPSED ? chevronRight : chevronDown

  return `
    <div class="rr-reg-container">
      <div class="rr-reg-table-wrap">
        ${renderRegTableHeader()}
        ${REGRESSION_ROWS.map(renderRegRow).join("")}
      </div>
      <div class="rr-reg-done-section">
        <div class="rr-reg-done-header">
          <button class="rr-reg-done-toggle" type="button" data-action="toggle-reg-done">${doneChevron}</button>
          <span class="rr-reg-done-badge">Done</span>
        </div>
        ${!REGRESSIONS_DONE_COLLAPSED ? `
        <div class="rr-reg-table-wrap">
          ${renderRegTableHeader()}
          ${REGRESSION_DONE_ROWS.map(renderRegDoneRow).join("")}
        </div>` : ""}
      </div>
    </div>`
}

function renderProductionTab() {
  const chevronDown = `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const chevronRight = `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="96,48 176,128 96,208" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const doneChevron = PRODUCTION_DONE_COLLAPSED ? chevronRight : chevronDown

  return `
    <div class="rr-reg-container">
      <div class="rr-reg-table-wrap">
        ${renderRegTableHeader()}
        ${PRODUCTION_ROWS.map(renderRegRow).join("")}
      </div>
      <div class="rr-reg-done-section">
        <div class="rr-reg-done-header">
          <button class="rr-reg-done-toggle" type="button" data-action="toggle-prod-done">${doneChevron}</button>
          <span class="rr-reg-done-badge">Done</span>
        </div>
        ${!PRODUCTION_DONE_COLLAPSED ? `
        <div class="rr-reg-table-wrap">
          ${renderRegTableHeader()}
          ${PRODUCTION_DONE_ROWS.map(renderRegDoneRow).join("")}
        </div>` : ""}
      </div>
    </div>`
}

function renderStakeholdersTableHeader() {
  const sortIcon = `<svg width="12" height="12" viewBox="0 0 256 256" fill="none"><line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" stroke-width="24" stroke-linecap="round"/><polyline points="56,144 128,216 200,144" stroke="currentColor" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  return `
    <div class="rr-reg-row rr-reg-row--header rr-reg-row--stakeholders">
      <div class="rr-reg-cell rr-reg-cell--icon" aria-hidden="true"></div>
      <div class="rr-reg-cell rr-reg-cell--issue">Issue</div>
      <div class="rr-reg-cell rr-reg-cell--priority">Priority ${sortIcon}</div>
      <div class="rr-reg-cell">Date</div>
      <div class="rr-reg-cell rr-reg-cell--assignee">Reporter</div>
      <div class="rr-reg-cell rr-reg-cell--assignee">Assignee</div>
      <div class="rr-reg-cell rr-reg-cell--pr">PR Link</div>
      <div class="rr-reg-cell rr-reg-cell--status">Status Staging</div>
      <div class="rr-reg-cell rr-reg-cell--status">Status Production</div>
    </div>`
}

function renderStakeholdersRow(row) {
  return `
    <div class="rr-reg-row rr-reg-row--stakeholders" data-action="open-issue-modal" data-issue='${JSON.stringify(row).replace(/'/g, "\\'") }'>
      <div class="rr-reg-cell rr-reg-cell--icon">
        ${STAKEHOLDERS_ICON_ISSUES.has(row.issue) ? `
          <span class="rr-reg-icon" title="Change Request" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM96,128a32,32,0,0,0,57.6,19.2,8,8,0,0,1,12.8,9.61,48,48,0,1,1,0-57.62,8,8,0,0,1-12.8,9.61A32,32,0,0,0,96,128Z"></path></svg>
          </span>
        ` : ``}
      </div>
      <div class="rr-reg-cell rr-reg-cell--issue">
        <span class="rr-reg-issue-title">${escapeHtml(row.issue)}</span>
      </div>
      <div class="rr-reg-cell rr-reg-cell--priority">${renderRegPriority(row.priority)}</div>
      <div class="rr-reg-cell">${escapeHtml(row.date)}</div>
      <div class="rr-reg-cell rr-reg-cell--assignee">${renderRegAvatarGroup([row.reporter])}</div>
      <div class="rr-reg-cell rr-reg-cell--assignee">${renderRegAvatarGroup(row.assignees)}</div>
      <div class="rr-reg-cell rr-reg-cell--pr">
        <button class="rr-reg-github-btn" type="button" title="View PR">${REG_GITHUB_ICON}</button>
      </div>
      <div class="rr-reg-cell rr-reg-cell--status">${renderRegStatus(row.statusStaging)}</div>
      <div class="rr-reg-cell rr-reg-cell--status">${renderRegStatus(row.statusProd)}</div>
    </div>`
}

function renderStakeholdersDoneRow(row) {
  return `
    <div class="rr-reg-row rr-reg-row--stakeholders" data-action="open-issue-modal" data-issue='${JSON.stringify(row).replace(/'/g, "\\'") }'>
      <div class="rr-reg-cell rr-reg-cell--icon">
        ${STAKEHOLDERS_ICON_ISSUES.has(row.issue) ? `
          <span class="rr-reg-icon" title="Change Request" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM96,128a32,32,0,0,0,57.6,19.2,8,8,0,0,1,12.8,9.61,48,48,0,1,1,0-57.62,8,8,0,0,1-12.8,9.61A32,32,0,0,0,96,128Z"></path></svg>
          </span>
        ` : ``}
      </div>
      <div class="rr-reg-cell rr-reg-cell--issue">
        <span class="rr-reg-issue-title">${escapeHtml(row.issue)}</span>
      </div>
      <div class="rr-reg-cell rr-reg-cell--priority">${renderRegPriority(row.priority)}</div>
      <div class="rr-reg-cell">${escapeHtml(row.date)}</div>
      <div class="rr-reg-cell rr-reg-cell--assignee">${renderRegAvatarGroup([row.reporter])}</div>
      <div class="rr-reg-cell rr-reg-cell--assignee"></div>
      <div class="rr-reg-cell rr-reg-cell--pr">
        <button class="rr-reg-github-btn" type="button" title="View PR">${REG_GITHUB_ICON}</button>
      </div>
      <div class="rr-reg-cell rr-reg-cell--status">${renderRegStatus(row.statusStaging)}</div>
      <div class="rr-reg-cell rr-reg-cell--status">${renderRegStatus(row.statusProd)}</div>
    </div>`
}

function renderStakeholdersTab() {
  const chevronDown = `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="48,96 128,176 208,96" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const chevronRight = `<svg width="16" height="16" viewBox="0 0 256 256" fill="none"><polyline points="96,48 176,128 96,208" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const doneChevron = STAKEHOLDERS_DONE_COLLAPSED ? chevronRight : chevronDown

  return `
    <div class="rr-reg-container">
      <div class="rr-reg-table-wrap">
        ${renderStakeholdersTableHeader()}
        ${STAKEHOLDERS_ROWS.map(renderStakeholdersRow).join("")}
      </div>
      <div class="rr-reg-done-section">
        <div class="rr-reg-done-header">
          <button class="rr-reg-done-toggle" type="button" data-action="toggle-stakeholders-done">${doneChevron}</button>
          <span class="rr-reg-done-badge">Done</span>
        </div>
        ${!STAKEHOLDERS_DONE_COLLAPSED ? `
        <div class="rr-reg-table-wrap">
          ${renderStakeholdersTableHeader()}
          ${STAKEHOLDERS_DONE_ROWS.map(renderStakeholdersDoneRow).join("")}
        </div>` : ""}
      </div>
    </div>`
}

function renderButtons() {
  return BUTTONS.map((btn) => {
    const isActive = ACTIVE_TAB === btn.id
    const classes = ["rr-testing-btn", isActive ? "is-active" : ""]
      .filter(Boolean)
      .join(" ")

    return `
      <button class="${classes}" type="button" data-tab="${escapeHtml(btn.id)}">
        ${escapeHtml(btn.label)}
      </button>
    `
  }).join("")
}

/* ── Overview Tab Rendering ───────────────────────────────── */
function renderStatusBadge(statusId) {
  const cfg = STATUS_CONFIG[statusId] || STATUS_CONFIG.attention
  return `
    <span class="rr-testing-status" style="background:${cfg.bg};color:${cfg.text}">
      ${escapeHtml(cfg.label)}
    </span>
  `
}

function renderRow(row) {
  return `
    <div class="rr-testing-row">
      <div class="rr-testing-cell rr-testing-cell--section">${escapeHtml(row.section)}</div>
      <div class="rr-testing-cell">${escapeHtml(row.passRate)}</div>
      <div class="rr-testing-cell">${escapeHtml(row.totalTests)}</div>
      <div class="rr-testing-cell">${escapeHtml(row.passed)}</div>
      <div class="rr-testing-cell">${escapeHtml(row.failed)}</div>
      <div class="rr-testing-cell">${escapeHtml(row.blocked)}</div>
      <div class="rr-testing-cell">${escapeHtml(row.progress)}</div>
      <div class="rr-testing-cell rr-testing-cell--status">${renderStatusBadge(row.status)}</div>
    </div>
  `
}

function renderTable(table) {
  return `
    <div class="rr-testing-table-card" data-table="${escapeHtml(table.id)}">
      <div class="rr-testing-table-title">${escapeHtml(table.title)}</div>
      <div class="rr-testing-table">
        <div class="rr-testing-row rr-testing-row--header">
          <div class="rr-testing-cell">Section</div>
          <div class="rr-testing-cell">Pass Rate</div>
          <div class="rr-testing-cell">Total Tests</div>
          <div class="rr-testing-cell">Passed</div>
          <div class="rr-testing-cell">Failed</div>
          <div class="rr-testing-cell">Blocked</div>
          <div class="rr-testing-cell">Progress</div>
          <div class="rr-testing-cell">Status</div>
        </div>
        ${table.rows.map(renderRow).join("")}
        <div class="rr-testing-row rr-testing-row--footer">
          <div class="rr-testing-footer">
            <span>Total progress</span>
            <strong>${escapeHtml(table.totalProgress)}</strong>
          </div>
        </div>
      </div>
    </div>
  `
}

function renderOverviewTab() {
  return `
    <div class="rr-testing-tables">
      ${TABLES.map(renderTable).join("")}
    </div>
  `
}

function renderIssueDescription(content) {
  const text = String(content || "No description provided")
  const lines = text.split(/\r?\n/)
  const headingLines = new Set(["Steps to Reproduce:", "Expected Result", "Actual Result"])
  const html = []
  let inOrderedList = false

  const closeList = () => {
    if (inOrderedList) {
      html.push("</ol>")
      inOrderedList = false
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      closeList()
      html.push('<p class="rr-modal-description-paragraph rr-modal-description-paragraph--spacer"></p>')
      continue
    }

    if (headingLines.has(trimmed)) {
      closeList()
      html.push(`<p class="rr-modal-description-heading">${escapeHtml(trimmed)}</p>`)
      continue
    }

    const numberedItem = trimmed.match(/^\d+\.\s+(.*)$/)
    if (numberedItem) {
      if (!inOrderedList) {
        html.push('<ol class="rr-modal-description-list">')
        inOrderedList = true
      }
      html.push(`<li>${escapeHtml(numberedItem[1])}</li>`)
      continue
    }

    closeList()
    html.push(`<p class="rr-modal-description-paragraph">${escapeHtml(trimmed)}</p>`)
  }

  closeList()
  return html.join("")
}

function renderIssueModalAttachments(details) {
  const attachments = Array.isArray(details.attachments) && details.attachments.length > 0
    ? details.attachments
    : ISSUE_MODAL_ATTACHMENTS

  return `
    <div class="rr-modal-attachments" role="region" aria-label="Issue attachments">
      ${attachments.map((attachment) => {
        const isVideo = attachment.type === "video"
        return `
          <button class="rr-modal-attachment-card ${isVideo ? "is-video" : ""}" type="button" title="Open attachment">
            <img class="rr-modal-attachment-image" src="${attachment.url}" alt="" loading="lazy" />
            ${isVideo ? `
              <span class="rr-modal-attachment-overlay" aria-hidden="true"></span>
              <span class="rr-modal-attachment-play" aria-hidden="true">
                <img class="rr-modal-attachment-play-bg" src="${ISSUE_MODAL_PLAY_BG}" alt="" />
              </span>
            ` : ""}
          </button>
        `
      }).join("")}
    </div>
  `
}

function renderIssueModalRelatedIssues(details) {
  const relatedIssues = Array.isArray(details.relatedIssues) && details.relatedIssues.length > 0
    ? details.relatedIssues
    : [
        { scope: "STG", title: "Document upload issue" },
        { scope: "STG", title: "Document not accessible" },
      ]

  return `
    <div class="rr-modal-related" role="region" aria-label="Related issues">
      ${relatedIssues.map((item) => `
        <button class="rr-modal-related-row" type="button" title="Open related issue">
          <span class="rr-modal-related-scope-cell">
            <span class="rr-modal-related-scope-badge">${escapeHtml(item.scope || "STG")}</span>
          </span>
          <span class="rr-modal-related-title-cell">${escapeHtml(item.title || "Untitled issue")}</span>
        </button>
      `).join("")}
    </div>
  `
}

function renderIssueModalHistory(details, reporter, assignee, statusLabel) {
  const reporterName = reporter && reporter.name ? reporter.name : "Unknown reporter"
  const reporterAvatar = {
    url: reporter && reporter.url ? reporter.url : "",
    bg: reporter && reporter.bg ? reporter.bg : "#d0d5dd",
  }
  const assigneeName = assignee && assignee.name ? assignee.name : "Unassigned"
  const assigneeAvatar = {
    url: assignee && assignee.url ? assignee.url : "",
    bg: assignee && assignee.bg ? assignee.bg : "#d0d5dd",
  }
  const issueStatusLabel = statusLabel || "To do"

  const history = Array.isArray(details.history) && details.history.length > 0
    ? details.history
    : [
        {
          date: "19/02/26",
          event: "Ready for review",
          author: "Orlando Diggs",
          avatar: { url: ISSUE_MODAL_HISTORY_AVATAR_ORLANDO, bg: "#cfc3a7" },
        },
        {
          date: "17/02/26",
          event: "Added Orlando Diggs as assignee",
          author: "Lana Steiner",
          avatar: { url: ISSUE_MODAL_HISTORY_AVATAR_LANA, bg: "#d4b5ad" },
        },
        {
          date: "14/02/26",
          event: "Issue created",
          author: reporterName,
          avatar: reporterAvatar,
        },
      ]

  const historyWithReporterForCreation = history.map((item) => {
    const eventText = String(item && item.event ? item.event : "").trim().toLowerCase()
    if (eventText === "issue created") {
      return {
        ...item,
        author: reporterName,
        avatar: reporterAvatar,
      }
    }
    if (eventText === "ready for review") {
      return {
        ...item,
        event: issueStatusLabel,
        author: assigneeName,
        avatar: assigneeAvatar,
      }
    }
    if (eventText.includes("as assignee")) {
      return {
        ...item,
        event: `Added ${assigneeName} as assignee`,
      }
    }
    return item
  })

  return `
    <div class="rr-modal-history" role="region" aria-label="Issue history">
      <span class="rr-modal-history-line" aria-hidden="true"></span>
      ${historyWithReporterForCreation.map((item, index) => `
        <span class="rr-modal-history-node" style="top:${index * 86}px" aria-hidden="true"></span>
        <div class="rr-modal-history-card" style="top:${index * 86 - 12}px">
          <p class="rr-modal-history-date">${escapeHtml(item.date || "")}</p>
          <p class="rr-modal-history-event">${escapeHtml(item.event || "")}</p>
          <div class="rr-modal-history-author-row">
            ${renderAvatarWithFallback({ url: item.avatar && item.avatar.url, bg: item.avatar && item.avatar.bg, name: item.author }, "rr-modal-history-avatar-wrap", "rr-modal-history-avatar")}
            <span class="rr-modal-history-author">${escapeHtml(item.author || "")}</span>
          </div>
        </div>
      `).join("")}
    </div>
  `
}

/* ── Issue Details Modal Rendering ─────────────────────────── */
function renderIssueModal() {
  if (!SELECTED_ISSUE || !MODAL_VISIBLE) return ""

  const issue = SELECTED_ISSUE
  const details = ISSUE_DETAILS_MAP[issue.issue] || {}
  
  const priorityColors = {
    urgent: { color: "#e14040", bg: "#fcd6d6" },
    high: { color: "#e14040", bg: "#fcd6d6" },
    medium: { color: "#f79009", bg: "#fff3cd" },
    low: { color: "#0e9255", bg: "#ddf7eb" },
  }
  
  const scopeColors = {
    "FE":    { bg: "#fef4e6", color: "#f79009" },
    "BE":    { bg: "#e0e2e7", color: "#3d4350" },
    "BE&FE": { bg: "#e0e2e7", color: "#3d4350" },
    "Devops":{ bg: "#eee3f6", color: "#9b5bce" },
    "STG":   { bg: "#eee3f6", color: "#9b5bce" },
    "PROD":  { bg: "#e0e2e7", color: "#3d4350" },
    "DEV":   { bg: "#fef4e6", color: "#f79009" },
  }
  
  const statusColors = {
    merged: { label: "Merged", bg: "#fbc6cd", color: "#d13245" },
    review: { label: "Ready for review", bg: "#eee3f6", color: "#9b5bce" },
    inprogress: { label: "In progress", bg: "#daebff", color: "#0067da" },
    todo: { label: "To do", bg: "#e0e2e7", color: "#3d4350" },
    error: { label: "Error", bg: "#fcdad7", color: "#c0362d" },
    done: { label: "Done", bg: "#ddf7eb", color: "#0e9255" },
  }
  
  const priorityConfig = priorityColors[issue.priority] || priorityColors.medium
  const scopeKey = details.scope || issue.scope || "DEV"
  const scopeConfig = scopeColors[scopeKey] || { bg: "#e0e2e7", color: "#3d4350" }
  const statusKey = details.status || issue.statusStaging || "todo"
  const statusConfig = statusColors[statusKey] || statusColors.todo
  const activeTool = ISSUE_MODAL_TOOL
  
  const assignee = details.assignee || (issue.assignees && issue.assignees[0])
  const derivedReporter = issue.reporter || assignee || (issue.assignees && issue.assignees[0]) || REG_AVATAR.alisa
  const reporter = details.reporter || derivedReporter
  
  return `
    <div class="rr-modal-overlay" data-action="close-modal">
      <div class="rr-modal-backdrop"></div>
      <div class="rr-modal-container">
        <div class="rr-modal-header">
          <div class="rr-modal-header-badge" style="background:${scopeConfig.bg};color:${scopeConfig.color}">
            ${escapeHtml(scopeKey)}
          </div>
          <div class="rr-modal-header-title">${escapeHtml(issue.issue)}</div>
          <div class="rr-modal-header-actions">
            <button class="rr-modal-action-btn" title="Copy" type="button">
              ${ICON.copy}
            </button>
            <button class="rr-modal-action-btn" data-action="close-modal" title="Close" type="button">
              ${ICON.close}
            </button>
          </div>
        </div>

        <div class="rr-modal-content">
          <div class="rr-modal-main">
            <h2 class="rr-modal-title">${escapeHtml(issue.issue)}</h2>
            
            <div class="rr-modal-meta-grid">
              <div class="rr-modal-meta-item">
                <div class="rr-modal-meta-label">PRIORITY</div>
                <div class="rr-modal-meta-value" style="color:${priorityConfig.color}">
                  ${renderRegPriority(issue.priority)}
                </div>
              </div>
              
              <div class="rr-modal-meta-item">
                <div class="rr-modal-meta-label">STATUS</div>
                <span class="rr-modal-status-badge" style="background:${statusConfig.bg};color:${statusConfig.color}">
                  ${escapeHtml(statusConfig.label || "To do")}
                </span>
              </div>
              
              <div class="rr-modal-meta-item">
                <div class="rr-modal-meta-label">ASSIGNEE</div>
                <div class="rr-modal-assignee">
                  ${renderAvatarWithFallback(assignee, "rr-modal-avatar-wrap", "rr-modal-avatar")}
                  <span>${escapeHtml(assignee && assignee.name ? assignee.name : "Unassigned")}</span>
                </div>
              </div>
              
              <div class="rr-modal-meta-item">
                <div class="rr-modal-meta-label">REPORTER</div>
                <div class="rr-modal-assignee">
                  ${renderAvatarWithFallback(reporter, "rr-modal-avatar-wrap", "rr-modal-avatar")}
                  <span>${escapeHtml(reporter && reporter.name ? reporter.name : "Alisa Brown")}</span>
                </div>
              </div>
            </div>
            
            <div class="rr-modal-section">
              <button class="rr-modal-pr-button" type="button">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                Pull Request
              </button>
            </div>
            
            <div class="rr-modal-section">
              <div class="rr-modal-section-label">DESCRIPTION</div>
              <div class="rr-modal-description" role="document">
                ${renderIssueDescription(details.description || issue.issueSub || "No description provided")}
              </div>
            </div>
          </div>

          <div class="rr-modal-aside">
            <div class="rr-modal-comments">
              <div class="rr-modal-tools" role="toolbar" aria-label="Issue panel tools">
                <button class="rr-modal-tool-btn ${activeTool === "comments" ? "is-active" : ""}" data-action="switch-modal-tool" data-tool="comments" type="button" title="Notes">${ICON.notes}</button>
                <button class="rr-modal-tool-btn ${activeTool === "attachments" ? "is-active" : ""}" data-action="switch-modal-tool" data-tool="attachments" type="button" title="Attach file">${ICON.paperclip}</button>
                <button class="rr-modal-tool-btn ${activeTool === "related" ? "is-active" : ""}" data-action="switch-modal-tool" data-tool="related" type="button" title="Related issues">${ICON.gitFork}</button>
                <button class="rr-modal-tool-btn ${activeTool === "history" ? "is-active" : ""}" data-action="switch-modal-tool" data-tool="history" type="button" title="History">${ICON.clockCounterClockwise}</button>
              </div>

              ${activeTool === "attachments" ? renderIssueModalAttachments(details) : ""}
              ${activeTool === "related" ? renderIssueModalRelatedIssues(details) : ""}
              ${activeTool === "history" ? renderIssueModalHistory(details, reporter, assignee, statusConfig.label || "To do") : ""}

              ${activeTool === "comments" && details.comments && details.comments.length > 0 ? `
                <div class="rr-modal-comments-list">
                  ${details.comments.map(comment => `
                    <div class="rr-modal-comment">
                      ${renderAvatarWithFallback(comment.avatar, "rr-modal-comment-avatar-wrap", "rr-modal-comment-avatar")}
                      <div class="rr-modal-comment-content">
                        <div class="rr-modal-comment-header">
                          <div class="rr-modal-comment-meta">
                            <span class="rr-modal-comment-author">${escapeHtml(comment.author)}</span>
                            <span class="rr-modal-comment-time">${escapeHtml(comment.timestamp)}</span>
                          </div>
                          <button class="rr-modal-comment-menu" type="button" title="Comment actions">${ICON.dotsThree}</button>
                        </div>
                        <div class="rr-modal-comment-text">${escapeHtml(comment.text)}</div>
                      </div>
                    </div>
                  `).join("")}
                </div>
              ` : ""}

              ${activeTool === "comments" && (!details.comments || details.comments.length === 0) ? `
                <div class="rr-add-issue-empty">
                  <span class="rr-add-issue-empty-icon" aria-hidden="true">${ICON.notes}</span>
                  <p class="rr-add-issue-empty-title">No notes</p>
                </div>
              ` : ""}

              ${activeTool === "comments" ? `<div class="rr-modal-input-area">
                <input type="text" class="rr-modal-input" placeholder="Write a note..." />
                <div class="rr-modal-input-actions">
                  <button class="rr-modal-input-btn" type="button" title="Emoji">${ICON.smiley}</button>
                  <button class="rr-modal-input-btn" type="button" title="Mention">${ICON.at}</button>
                  <button class="rr-modal-input-btn" type="button" title="Add image">${ICON.image}</button>
                  <button class="rr-modal-input-btn rr-modal-input-btn--send" type="button" title="Send">${ICON.arrowUp}</button>
                </div>
              </div>` : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

/* ── Sprint Tab Rendering ──────────────────────────────────── */
function renderTestCaseStatus(result) {
  if (result === "blocked") {
    return `<span class="rr-sprint-tc-status rr-sprint-tc-status--blocked">Blocked</span>`
  } else if (result === "pass") {
    return `<span class="rr-sprint-tc-status rr-sprint-tc-status--pass">Pass</span>`
  } else if (result === "fail") {
    return `<span class="rr-sprint-tc-status rr-sprint-tc-status--fail">Fail</span>`
  }
  return `<span class="rr-sprint-tc-status">-</span>`
}

function renderTaskStatus(status) {
  if (status === "review") {
    return `<span class="rr-sprint-task-status rr-sprint-task-status--review">Ready for review</span>`
  } else if (status === "todo") {
    return `<span class="rr-sprint-task-status rr-sprint-task-status--todo">To do</span>`
  }
  return ""
}

function renderTestCase(testCase, module) {
  const avatarBg = module.avatarBg || "#c7b9da"
  
  return `
    <tr class="rr-sprint-test-case">
      <td class="rr-sprint-tc-cell rr-sprint-tc-cell--description">
        <div class="rr-sprint-tc-description">
          <p class="rr-sprint-tc-text">${escapeHtml(testCase.description)}</p>
          <span class="rr-sprint-id-badge">${escapeHtml(testCase.idBadge)}</span>
        </div>
      </td>
      <td class="rr-sprint-tc-cell">
        <p class="rr-sprint-tc-text">${escapeHtml(testCase.preConditions)}</p>
      </td>
      <td class="rr-sprint-tc-cell">
        <p class="rr-sprint-tc-text">${escapeHtml(testCase.steps)}</p>
      </td>
      <td class="rr-sprint-tc-cell">
        <p class="rr-sprint-tc-text">${escapeHtml(testCase.expectedResults)}</p>
      </td>
      <td class="rr-sprint-tc-cell rr-sprint-tc-cell--status">
        ${renderTestCaseStatus(testCase.result)}
      </td>
      <td class="rr-sprint-tc-cell rr-sprint-tc-cell--uat">
        <div class="rr-sprint-uat-content">
          <p class="rr-sprint-uat-text">${escapeHtml(testCase.uatIssue)}</p>
          ${testCase.uatIssueStatus ? renderTaskStatus(testCase.uatIssueStatus) : ""}
        </div>
      </td>
    </tr>
  `
}

function renderModule(module) {
  const isExpanded = EXPANDED_MODULES.has(module.id)
  const hasTestCases = module.testCases && module.testCases.length > 0
  
  // Calculate test case progress
  let total = 0, passing = 0;
  if (hasTestCases) {
    total = module.testCases.length;
    passing = module.testCases.filter(tc => tc.result === "pass").length;
  }

  return `
    <div class="rr-sprint-module" data-module-id="${escapeHtml(module.id)}">
      <div class="rr-sprint-module-header">
        <button class="rr-sprint-expand-btn" data-module-id="${escapeHtml(module.id)}">
          ${isExpanded ? ICON.caretDown : ICON.caretRight}
        </button>
        <span class="rr-sprint-icon">${ICON.folderSimple}</span>
        <h3 class="rr-sprint-module-title">
          ${escapeHtml(module.title)}
          ${hasTestCases ? `<span class="rr-sprint-module-progress">(${passing}/${total})</span>` : ""}
        </h3>
      </div>
      ${isExpanded && hasTestCases ? `
        <div class="rr-sprint-module-content">
          <table class="rr-sprint-test-table">
            <thead>
              <tr class="rr-sprint-test-header">
                <th>Description</th>
                <th>Pre-conditions</th>
                <th>Steps</th>
                <th>Expected results</th>
                <th>Result</th>
                <th>UAT Issue</th>
              </tr>
            </thead>
            <tbody>
              ${module.testCases.map(tc => renderTestCase(tc, module)).join("")}
            </tbody>
          </table>
        </div>
      ` : ""}
    </div>
  `
}

function renderSprintTab() {
  return `
    <div class="rr-sprint-modules">
      ${SPRINT_MODULES.map(renderModule).join("")}
    </div>
  `
}

export function renderTestingTabFlow() {
  // Render the active tab content
  const tabContent =
    ACTIVE_TAB === "sprint"       ? renderSprintTab() :
    ACTIVE_TAB === "regressions"  ? renderRegressionsTab() :
    ACTIVE_TAB === "production"   ? renderProductionTab() :
    ACTIVE_TAB === "stakeholders" ? renderStakeholdersTab() :
    renderOverviewTab()
  
  return `
    <div class="rr-testing-wrapper">
      <section class="rr-testing" data-flow="testing-tab">
        <div class="rr-testing-controls">
          <div class="rr-testing-button-group" role="tablist">
            ${renderButtons()}
          </div>
          ${ACTIVE_TAB !== "overview" ? `
            <div class="rr-testing-search">
              <span class="rr-testing-search-icon" aria-hidden="true">
                ${ICON.search}
              </span>
              <input class="rr-testing-search-input" type="text" placeholder="Search" />
            </div>
          ` : ""}
        </div>
        ${tabContent}
      </section>
      ${renderAddIssueModal()}
      ${renderIssueModal()}
    </div>
  `
}

function bindSprintModuleToggles() {
  document.querySelectorAll(".rr-sprint-expand-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const moduleId = e.currentTarget.getAttribute("data-module-id")

      if (EXPANDED_MODULES.has(moduleId)) {
        EXPANDED_MODULES.delete(moduleId)
      } else {
        EXPANDED_MODULES.add(moduleId)
      }

      // Re-render only Sprint modules, then rebind toggle handlers for new buttons.
      const sprintContainer = document.querySelector(".rr-sprint-modules")
      if (sprintContainer) {
        sprintContainer.innerHTML = SPRINT_MODULES.map(renderModule).join("")
        bindSprintModuleToggles()
      }
    })
  })
}

/* ── Event Handlers & Interactivity ───────────────────────── */
export function initTestingTab() {
  updateTestingHeaderActions()

  const openAddIssueButton = document.querySelector(`#${TESTING_HEADER_ACTIONS_ID} rr-button-icon[data-action='open-add-issue-modal']`)
  if (openAddIssueButton) {
    openAddIssueButton.addEventListener("click", () => {
      ADD_ISSUE_MODAL_VISIBLE = true
      ADD_ISSUE_MODAL_TOOL = "comments"
      ADD_ISSUE_PRIORITY = ""
      ADD_ISSUE_PRIORITY_DROPDOWN_OPEN = false
      MODAL_VISIBLE = false
      SELECTED_ISSUE = null

      const wrapper = document.querySelector(".rr-testing-wrapper")
      if (wrapper) {
        wrapper.innerHTML = renderTestingTabFlow()
        initTestingTab()
      }
    })
  }

  // Tab switching
  document.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tabId = e.currentTarget.getAttribute("data-tab")
      ACTIVE_TAB = tabId

      // Re-render only the testing section, leaving the tab header intact
      const container = document.querySelector('[data-flow="testing-tab"]')
      if (container) {
        container.outerHTML = renderTestingTabFlow()
        initTestingTab() // Re-attach event handlers
      }
    })
  })

  if (ACTIVE_TAB === "sprint") {
    bindSprintModuleToggles()
  }

  // Regressions – Done section toggle
  document.querySelectorAll("[data-action='toggle-reg-done']").forEach((btn) => {
    btn.addEventListener("click", () => {
      REGRESSIONS_DONE_COLLAPSED = !REGRESSIONS_DONE_COLLAPSED
      const container = document.querySelector('[data-flow="testing-tab"]')
      if (container) {
        container.outerHTML = renderTestingTabFlow()
        initTestingTab()
      }
    })
  })

  // Production Issues – Done section toggle
  document.querySelectorAll("[data-action='toggle-prod-done']").forEach((btn) => {
    btn.addEventListener("click", () => {
      PRODUCTION_DONE_COLLAPSED = !PRODUCTION_DONE_COLLAPSED
      const container = document.querySelector('[data-flow="testing-tab"]')
      if (container) {
        container.outerHTML = renderTestingTabFlow()
        initTestingTab()
      }
    })
  })

  // Stakeholders Issues – Done section toggle
  document.querySelectorAll("[data-action='toggle-stakeholders-done']").forEach((btn) => {
    btn.addEventListener("click", () => {
      STAKEHOLDERS_DONE_COLLAPSED = !STAKEHOLDERS_DONE_COLLAPSED
      const container = document.querySelector('[data-flow="testing-tab"]')
      if (container) {
        container.outerHTML = renderTestingTabFlow()
        initTestingTab()
      }
    })
  })

  // Issue Modal – Open issue details
  document.querySelectorAll("[data-action='open-issue-modal']").forEach((row) => {
    row.addEventListener("click", (e) => {
      // Don't open modal if clicking the PR button
      if (e.target.closest(".rr-reg-github-btn")) {
        return
      }
      
      const issueData = row.getAttribute("data-issue")
      if (issueData) {
        try {
          ADD_ISSUE_MODAL_VISIBLE = false
          SELECTED_ISSUE = JSON.parse(issueData)
          MODAL_VISIBLE = true
          ISSUE_MODAL_TOOL = "comments"
          
          // Re-render with modal
          const wrapper = document.querySelector(".rr-testing-wrapper")
          if (wrapper) {
            wrapper.innerHTML = renderTestingTabFlow()
            initTestingTab() // Re-attach event handlers
          }
        } catch (err) {
          console.error("Failed to parse issue data:", err)
        }
      }
    })
  })

  // Issue Modal – Switch right panel tool
  document.querySelectorAll("[data-action='switch-modal-tool']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tool = e.currentTarget.getAttribute("data-tool")
      if (!tool || tool === ISSUE_MODAL_TOOL) return

      ISSUE_MODAL_TOOL = tool

      const wrapper = document.querySelector(".rr-testing-wrapper")
      if (wrapper) {
        wrapper.innerHTML = renderTestingTabFlow()
        initTestingTab()
      }
    })
  })

  // Add Issue Modal – Switch right panel tool
  document.querySelectorAll("[data-action='switch-add-issue-tool']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tool = e.currentTarget.getAttribute("data-tool")
      if (!tool || tool === ADD_ISSUE_MODAL_TOOL) return

      ADD_ISSUE_MODAL_TOOL = tool

      const wrapper = document.querySelector(".rr-testing-wrapper")
      if (wrapper) {
        wrapper.innerHTML = renderTestingTabFlow()
        initTestingTab()
      }
    })
  })

  // Add Issue Modal – Priority dropdown toggle
  document.querySelectorAll("[data-action='toggle-add-issue-priority']").forEach((btn) => {
    btn.addEventListener("click", () => {
      ADD_ISSUE_PRIORITY_DROPDOWN_OPEN = !ADD_ISSUE_PRIORITY_DROPDOWN_OPEN

      const wrapper = document.querySelector(".rr-testing-wrapper")
      if (wrapper) {
        wrapper.innerHTML = renderTestingTabFlow()
        initTestingTab()
      }
    })
  })

  // Add Issue Modal – Priority dropdown select option
  document.querySelectorAll("[data-action='select-add-issue-priority']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const priority = e.currentTarget.getAttribute("data-priority") || ""
      ADD_ISSUE_PRIORITY = priority
      ADD_ISSUE_PRIORITY_DROPDOWN_OPEN = false

      const wrapper = document.querySelector(".rr-testing-wrapper")
      if (wrapper) {
        wrapper.innerHTML = renderTestingTabFlow()
        initTestingTab()
      }
    })
  })

  // Add Issue Modal – Close only from top-right X button
  document.querySelectorAll("[data-action='close-add-issue-modal-x']").forEach((btn) => {
    btn.addEventListener("click", () => {
      ADD_ISSUE_MODAL_VISIBLE = false
      ADD_ISSUE_MODAL_TOOL = "comments"
      ADD_ISSUE_PRIORITY_DROPDOWN_OPEN = false

      const wrapper = document.querySelector(".rr-testing-wrapper")
      if (wrapper) {
        wrapper.innerHTML = renderTestingTabFlow()
        initTestingTab()
      }
    })
  })

  document.querySelectorAll("[data-action='submit-add-issue']").forEach((btn) => {
    btn.addEventListener("click", () => {
      ADD_ISSUE_MODAL_VISIBLE = false
      ADD_ISSUE_MODAL_TOOL = "comments"
      ADD_ISSUE_PRIORITY_DROPDOWN_OPEN = false

      const wrapper = document.querySelector(".rr-testing-wrapper")
      if (wrapper) {
        wrapper.innerHTML = renderTestingTabFlow()
        initTestingTab()
      }
    })
  })

  // Issue Modal – Close modal
  document.querySelectorAll("[data-action='close-modal']").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const clickedCloseButton = Boolean(e.target.closest(".rr-modal-action-btn"))
      const clickedOverlay = e.currentTarget.classList.contains("rr-modal-overlay") && e.target === e.currentTarget
      const clickedBackdrop = Boolean(e.target.closest(".rr-modal-backdrop"))

      if (clickedCloseButton || clickedOverlay || clickedBackdrop) {
        MODAL_VISIBLE = false
        SELECTED_ISSUE = null
        ISSUE_MODAL_TOOL = "comments"
        
        // Re-render without modal
        const wrapper = document.querySelector(".rr-testing-wrapper")
        if (wrapper) {
          wrapper.innerHTML = renderTestingTabFlow()
          initTestingTab() // Re-attach event handlers
        }
      }
    })
  })
}
