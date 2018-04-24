<template>
  <div class="page-container">
    <h1>{{ $t('privacy.title') }}</h1>
    <p v-html="$t('privacy.description')"></p>
  </div>
</template>

<script>
  export default {
    head () {
      return {
        title: this.$t('privacy.title'),
        meta: [
          { hid: 'description', name: 'description', content: this.$t('All personal information handled by Factory Hunt has been collected, stored and managed based on relevant Acts and Articles. The 「Personal Information Protection Act」 provides general criteria for the handling of personal information, and Factory Hunt will handle personal information, to be collected, stored and managed in accordance with the Article of the Act, legally and appropriately for proper performing of services and for protecting user’s right and interest.') }
        ],
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/privacy` }
        ]
      }
    },
    messages: {
      eng: {
        privacy: `
        <h3>Privacy Policy</h3>
    <div>
      <ul>
        <li>All personal information handled by Factory Hunt has been collected, stored and managed based on relevant Acts and Articles.</li>
        <li>The 「Personal Information Protection Act」 provides general criteria for the handling of personal information, and Factory Hunt will handle personal information, to be collected, stored and managed in accordance with the Article of the Act, legally and appropriately for proper performing of services and for protecting user’s right and interest.</li>
        <li>In addition, Factory Hunt respects the interests of users such as access, correction, deletion and suspension of personal information as prescribed by relevant Acts and Articles. Users may request an administrative appeal in accordance with the Administrative Appeal Act in relation to the infringement of rights and interests in this Act.</li>
        <li>Factory Hunt formulates and discloses the following personal information management policy to protect the personal information and the rights and interests of owner of information according to Article 30 of the "Personal Information Protection Act"  in order to seamlessly handle user's complaints related to personal information.</li>
      </ul>
      <h4>1. Purpose of Personal Information Management</h4>
      <ol>
        <li>Factory Hunt manages personal information for following purpose. Management of personal information won’t be used for any purposes other than the following purposes and will take necessary measures such as obtaining separate consent, etc according to the Acticle 18 of Personal Information Protection Act in case the purpose of usage is altered.</li>
        <li>Factory Hunt, the purpose of the personal information file management to be registered and disclosed in accordance with the Article 32 of the Personal Information Protection Act is specified as follows.</li>
      </ol>
      <div>
        <table class="table table-bordered">
          <caption>Personal Information Processing Consignment</caption>
          <thead>
          <tr>
            <th>No</th>
            <th>Name of Personal information file</th>
            <th>Operating grounds</th>
            <th>Purpose of management</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>Buyers information</td>
            <td>Owner of information’s consent </td>
            <td>Providing services and support trading</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Suppliers information</td>
            <td>Owner of information’s consent</td>
            <td>Providing services and support trading</td>
          </tr>
          </tbody>
        </table>
      </div>

      <h4>2. Personal Information Management and Retention Period</h4>
      <ol>
        <li>Factory Hunt manages and retains personal information within the period of retaining or using personal information in accordance with the article and the Act or during the period of using or retaining personal information consented from owner of information when to collect personal information.</li>
        <li>The management and retention period of each of personal information is specified as follows.</li>
      </ol>
      <div>
        <table class="table table-bordered">
          <caption>Personal Information Processing Consignment</caption>
          <thead>
          <tr>
            <th>No</th>
            <th>Name of Personal information file</th>
            <th>Operating grounds</th>
            <th>Purpose of management</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>Buyers information</td>
            <td>Consent of user</td>
            <td>Until the membership withdrawal</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Suppliers information</td>
            <td>Consent of user</td>
            <td>Until the membership withdrawal</td>
          </tr>
          </tbody>
        </table>
      </div>
      <h4>3.Providing Personal Information to a Third Party</h4>
      <p>Factory Hunt shall, in principle, manage the personal information of the owner of information within the scope specified for the purpose of collection and usage, and except for the following cases, will not manage beyond the scope of its original purpose or not provide to a third party without the prior consent of the owner of information.</p>
      <ol>
        <li>The case to obtain separate consent from owner of information.</li>
        <li>The case special articles are prescribed in the Act and the Articles.</li>
        <li>As the case where owner of information or legal representative is unable to give the declaration of his/her consent or is unable to obtain prior consent due to unknown address, the case clearly admitted to be necessary for the benefit of owner of information or third party's imminent life, body, property.</li>
        <li>As the case necessary for statistical writing and academic research purposes, the case to provide personal information in a form that can’t identify a specific individual.</li>
        <li>As the case the personal information is used for intended purposes other than the purpose or if not provided to a third party, the duties stipulated by other Act cannot be performed, the case to pass through deliberation and resolution of the protection committee.</li>
        <li>The case to be necessary to provide to foreign governments or international organizations for performing treaties or other international agreements</li>
        <li>The case to be necessary for investigating crimes, and filing and maintaining the prosecution</li>
        <li>The case to be necessary to perform the court’s trial</li>
        <li>The case to be necessary to execute punishment as well as custody, probation</li>
      </ol>
      <h4>4. Entrustment of Personal Information Management</h4>
      <ol>
        <p>We may outsource personal information processing services to third party service providers to facilitate and improve our services.</p>
      </ol>
      <h4>5. Matters on Rights and Responsibilities of Owner of Information and Methods of the Usage</h4>
      <ol>
        <li>The owner of information (the legal representative can exercise the right under 14 years of age) can exercise the right of personal information protection of following each subparagraph at any time.</li>
        <ul>
          <li>Request to access personal information</li>
          <li>If there is an error, request correction</li>
          <li>Request to delete</li>
          <li>Request to suspend management</li>
        </ul>
        <li>The execution of right under Paragraph 1 may be made in writing or e-mail after completing Attached Form 8 of the Enforcement Rules of the Personal Information Protection Act, and the institution will take measures without delay.</li>
        <li>When owner of information has requested correction or deletion of personal information, it will not be use or provided that year personal information until the correction or deletion is completed.</li>
        <li>The execution of right under Paragraph 1 may be done through the legal representative of owner of information or the agent, etc such as the person who has been delegated. In this case, he/she must submit a power of attorney according to Attached Form 11 of the Enforcement Rules of the Personal Information Protection Act.</li>
        <li>The request of the personal information access and suspension of management of, the right of owner of information may be restricted by the Personal Information Protection Act Article 35 Paragraph 5, Article 37 Paragraph 2.</li>
        <li>Requests for the correction and deletion of personal information cannot be requested to be deleted if the personal information is specified as to be collected object in the other Act and Articles.</li>
        <li>We verify whether the person to request for access, correction, deletion, suspension, etc according to the owner of information’s right, is the person himself or a legitimate representative.</li>
        <ul>
          <li>Present identity card to identify yourself (identity card, driver's license, passport, etc.)</li>
          <li>In case of a representative, present your identity card and a power of attorney to identify your representative</li>
          <li><a href="http://www.law.go.kr/lsBylInfoPLinkR.do?lsiSeq=137979&lsNm=%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%20%EB%B3%B4%ED%98%B8%EB%B2%95%20%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99&bylNo=0008&bylBrNo=00&bylCls=BF&bylEfYd=" target="_blank">
            <span>[Personal Information Protection Act Enforcement Rules, Attachment No. 8] Requesting letter for Personal Information (Access, Correction, Deletion, Suspension of Management)</span></a></li>
          <li><a href="http://www.law.go.kr/lsBylInfoPLinkR.do?lsiSeq=137979&lsNm=%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%20%EB%B3%B4%ED%98%B8%EB%B2%95%20%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99&bylNo=0011&bylBrNo=00&bylCls=BF&bylEfYd=" target="_blank">
            <span>[Enforcement Rules of Personal Information Protection Act Attachment 11] Power of Attorney</span></a></li>
        </ul>
      </ol>

      <h4>6. Items of Personal Information Management</h4>
      Factory Hunt manages following personal information items.

      <div>
        <table class="table table-bordered">
          <caption>Personal Information Processing Consignment</caption>
          <thead>
          <tr>
            <th>No</th>
            <th>Name of personal information file </th>
            <th>Personal information items recorded in the personal information file (Required)</th>
            <th>Personal information items recorded in the personal information file (Optional)</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>Overseas buyers information</td>
            <td>Email, Password, Company Name</td>
            <td>Company Information (website, Business registration number, Number of employees, Established date, Phone number, Fax number, History, Address), Name, Salutation, Title, Cellphone</td>

          </tr>
          <tr>
            <td>2</td>
            <td>Factory Hunt membership</td>
            <td>Email, Password, Company Name</td>
            <td>Company Information (website, Business registration number, Number of employees, Established date, Phone number, Fax number, History, Address), Name, Salutation, Title, Cellphone</td>
          </tr>
          </tbody>
        </table>
      </div>

      <h4>7. Procedures and Methods of Personal Information Destruction</h4>
      <p>Factory Hunt will, in principle, destroy personal information without delay when the purpose of personal information management is achieved. However, when it is necessary to preserve it in accordance with other Acts, this is not the case. The procedures, deadlines and methods of destruction are specified as follows.</p>
      <ol>
        <li>Destruction procedure</li>
        <p>Unnecessary personal information and personal information files are managed under the responsibilities of personal information manager according to the internal policy procedure as follows.</p>
        <ul>
          <li>Destruction of personal information</li>
          <p>Personal information that has passed the retention period will be destroyed without delay from the end date</p>
          <li>Destruction of personal information files</li>
          <p>When the personal information file becomes unnecessary such as the purpose of personal information file management being achieved, abolition of service, or the end of the business, the personal information file is destroyed without delay from the date when personal information management is recognized as unnecessary.</p>
        </ul>
        <li>How to destroy</li>
        <ul>
          <li>Electronic forms of information use technological methods that cannot reproduce the records.</li>
          <li>Personal information printed on paper is shredded by shredder or destroyed by incineration.</li>
        </ul>
      </ol>
      <h4>8. Measures to Ensure the Safety of Personal Information</h4>
      <p>Factory Hunt, pursuant to Article 29 of the 「Personal Information Protection Act」, takes the technical, administrative and physical measures necessary for ensuring safety as follows.</p>
      <ol>
        <li>Minimization and training of personal information managers</li>
        <p>We have designated and minimized the person in charge of personal information management and implemented measures to manage personal information.</p>
        <li>Controlled and restricted access to personal information</li>
        <p>We take necessary measures to control access to personal information through granting, modifying, and deleting access rights to the database system that manages personal information, and also control unauthorized access from outside by using an intrusion prevention system.</p>
        <li>Storing access records</li>
        <p>We have designated and minimized the person in charge of personal information management and implemented measures to manage personal information.</p>
        <li>Encryption of personal information</li>
        <p>The user’s personal information is encrypted and stored and managed. In addition, important data use separate security function such as using to be encrypted, etc when to store and transmit.</p>
        <li>Security program installation and periodic inspection · update</li>
        <p>Factory Hunt installs and is periodically updated and inspected a security program to prevent personal information from being divulged or damaged by hacking or computer viruses,</p>
        <li>Access control to unauthorized persons</li>
        <p>The physical storage place of the personal information system that stored personal information is separately set up, and access control procedures are formulated and operated accordingly</p>
      </ol>
      <h4>9. Contact Point in charge of Personal Information Protection</h4>
      <ul>
        <li>Personal Information Management</li>
        <ul>
          <li>Title : CTO</li>
          <li>Name : Peter Kim</li>
          <li>Email : info@factoryhunt.com</li>
        </ul>
      </ul>

      <h4>10. Personal Information Access Request</h4>
      <ol>
        <li>The owner of information can request to access personal information pursuant to Article 35 of the Personal Information Protection Act to the following department. Factory Hunt will endeavor to promptly handle owner of information’s request to access personal information.</li>
        <ul>
          <li>The department of reception and handling of request to access personal information</li>
          <ul>
            <li>Title : CTO</li>
            <li>Name : Peter Kim</li>
            <li>Email : info@factoryhunt.com</li>
          </ul>
        </ul>
        <li>In addition to the reception and handling department of access request of Paragraph 1, the owner of information can also request personal information access through the website of the comprehensive support for personal information protection (<a href="http://www.privacy.go.kr" target="_blank">www.privacy.go.kr</a>) of the Ministry of the Interior.</li>
        <ul>
          <li>The Ministry of the Interior’s comprehensive support portal for personal information protection → Complaints of personal information → Request for personal information access (requires real name verification through public Ipin)</li>
        </ul>
      </ol>
      <h4>11. How to Relieve Infringement</h4>
      <p>The owner of information can inquire damage relief, consultation, and others about infringement of personal information to the following institutions. (As the following institutions are separate from Factory Hunt, when you are not satisfied with Factory Hunt's own personal information complaints handling, damage relief results, or need further assistance, please contact them.)</p>
      <ul>
        <li>Reporting Center for Infringements on Personal Information (operated by The Korea Internet and Security Agency)</li>
        <ul>
          <li>Affairs : Reporting personal information infringement, application for consultation</li>
          <li>Homepage : <a href="http://privacy.kisa.or.kr" target="_blank">privacy.kisa.or.kr</a></li>
          <li>Telephone : (Without an area code) 118</li>
          <li>Address : (138-950), 135 Joongdae Road, Songpa-gu, Seoul, The Korea Internet & Security Agency Personal Information Infringement Reporting Center</li>
        </ul>
        <li>Personal Information Dispute Mediation Committee (The Korea Internet and Security Agency)</li>
        <ul>
          <li>Affairs : Personal information dispute mediation application, collective dispute mediation (civil settlement)</li>
          <li>Homepage : <a href="http://www.kopico.go.kr" target="_blank">www.kopico.go.kr</a></li>
          <li>Tel : 1833-6972</li>
          <li>Address : (03171) 209 Sejong Daero Road, Jongno-gu, Government Seoul Office 4F Personal Information Dispute Mediation Committee</li>
        </ul>
        <li>Supreme Prosecutors' Office Cyber Crime Investigation Department: 1301 (<a href="http://www.spo.go.kr" target="_blank">www.spo.go.kr</a>, <a href="mailto:cid@spo.go.kr">cid@spo.go.kr</a>)</li>
        <li>Cyber Terror Response Center of National Police Agency : 182 (<a href="http://cyberbureau.police.go.kr" target="_blank">cyberbureau.police.go.kr</a>)</li>
      </ul>
      <p>In addition, a person who is infringed the rights or interests due to administrative disposition or omission by the head of public institution for the request of owner of information on personal information correction, deletion or suspension, etc, can request the administrative appeals as provided by the Administrative Appeals Act</p>
      <p>Refer to the telephone number of the Central Administrative Appeals Commission(<a href="http://www.simpan.go.kr" target="_blank">www.simpan.go.kr</a>)</p>

      <h4>12. Matters on the Installation and Operation of Automatic Collection Device of Personal Information and Rejection thereof</h4>
      <p>Factory Hunt can use cookie which stores users information and detect them at any time (COOKIE, automatic collection device of personal information such as internet access information file, etc). A cookie, as a small amount of information that a server to be used to run an institution's website sends to a user's browser, is also stored on the user's computer's hard disk. When a user accesses a website, the institution’s computer can read the contents of the cookie on the user's browser and detect user’s additional information in your computer, and can provide the service without further input such as the name of the contact, and others. Cookies identify your computer but do not personally identify yourself. In addition, the user has the option of installing cookies. As a result, by that the user can install the options in the web browser, the user accept all cookies, or check each time when a cookie is saved, or refuse to save all cookies. However, when you refuse to install cookies, you might turn to be uncomfortable with using the web and to have difficulty in using some services that require login.</p>
      <p>Example of how to install</p>
      <ul>
        <li>Internet Explorer : Tools menu at the top of web browser ▷ Internet options ▷ Personal information ▷ Cookie blocking level installation</li>
        <li>Chrome : Installation menu on the right side of Web browser ▷ Advanced installation display at the bottom of the screen ▷ Contents installing button of personal information ▷ Cookie blocking level installation</li>
      </ul>
    </div>`
      },
      kor: {
        privacy: `
        <h3>개인 정보 보호 정책</h3>
      <div>
        <h4>Factory Hunt 개인정보 처리방침</h4>
        <ul>
          <li>Factory Hunt에서 취급하는 모든 개인정보는 관련 법령에 근거하여 수집 · 보유 및 처리되고 있습니다.</li>
          <li>「개인정보보호법」은 이러한 개인정보의 취급에 대한 일반적 규범을 제시하고 있으며 , Factory Hunt는 이러한 법령의 규정에 따라 수집 · 보유 및 처리하는 개인정보를 업무의 적절한 수행과 이용자의 권익을 보호하기 위해 적법하고 적정하게 취급하겠습니다.</li>
          <li>또한 Factory Hunt는 관련 법령에서 규정한 바에 따라 보유하고 있는 개인정보에 대한 열람, 정정·삭제, 처리정지 요구 등 이용자의 권익을 존중하며, 이용자는 이러한 법령상 권익의 침해 등에 대하여 행정심판법에서 정하는 바에 따라 행정심판을 청구할 수 있습니다.</li>
          <li>Factory Hunt는 「개인정보보호법」 제30조에 따라 정보주체의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 개인정보 처리방침을 수립 · 공개하고 있습니다.</li>
        </ul>
        <h4>1. 개인정보의 처리 목적</h4>
        <ol>
          <li>Factory Hunt는 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</li>
          <li>Factory Hunt는 개인정보보호법 제32조에 따라 등록·공개하는 개인정보파일의 처리목적은 다음과 같습니다.</li>
        </ol>
        <table class="table table-bordered">
          <caption>개인정보파일의 처리목적</caption>
          <thead>
          <tr>
            <th></th>
            <th>개인정보파일의 명칭</th>
            <th>운영근거</th>
            <th>처리목적</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>바이어 정보</td>
            <td>정보주체의 동의</td>
            <td>서비스 제공 및 수출입 업무 지원</td>
          </tr>
          <tr>
            <td>2</td>
            <td>제조업체 정보</td>
            <td>정보주체의 동의</td>
            <td>서비스 제공 및 수출입 업무 지원</td>
          </tr>
          </tbody>
        </table>
        <h4>2. 개인정보의 처리 및 보유 기간</h4>
        <ol>
          <li>Factory Hunt는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</li>
          <li>각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</li>
        </ol>
        <table class="table table-bordered">
          <caption>개인정보 처리 및 보유 기간</caption>
          <thead>
          <tr>
            <th></th>
            <th>개인정보파일의 명칭</th>
            <th>운영근거</th>
            <th>보유기간</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>바이어 정보</td>
            <td>정보주체의 동의</td>
            <td>회원탈퇴 시까지</td>
          </tr>
          <tr>
            <td>2</td>
            <td>제조업체 정보</td>
            <td>정보주체의 동의</td>
            <td>회원탈퇴 시까지</td>
          </tr>
          </tbody>
        </table>
        <h4>3. 개인정보의 제3자 제공</h4>
        <p>Factory Hunt는 원칙적으로 정보주체의 개인정보를 수집·이용 목적으로 명시한 범위 내에서 처리하며, 다음의 경우를 제외하고는 정보주체의 사전 동의 없이는 본래의 목적 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다.</p>
        <ol>
          <li>정보주체로부터 별도의 동의를 받는 경우</li>
          <li>법률에 특별한 규정이 있는 경우</li>
          <li>정보주체 또는 법정대리인이 의사표시를 할 수 없는 상태에 있거나 주소불명 등으로 사전 동의를 받을 수 없는 경우로서 명백히 정보주체 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우</li>
          <li>통계작성 및 학술연구 등의 목적을 위하여 필요한 경우로서 특정 개인을 알아 볼 수 없는 형태로 개인정보를 제공하는 경우</li>
          <li>개인정보를 목적 외의 용도로 이용하거나 이를 제3자에게 제공하지 아니하면 다른 법률에서 정하는 소관 업무를 수행할 수 없는 경우로서 보호위원회의 심의·의결을 거친 경우</li>
          <li>조약, 그 밖의 국제협정의 이행을 위하여 외국정보 또는 국제기구에 제공하기 위하여 필요한 경우</li>
          <li>범죄의 수사와 공소의 제기 및 유지를 위하여 필요한 경우</li>
          <li>법원의 재판업무 수행을 위하여 필요한 경우</li>
          <li>형 및 감호, 보호처분의 집행을 위하여 필요한 경우</li>
        </ol>
        <h4>4. 개인정보처리 위탁</h4>
        <ol>
          <li>회사는 원활하고 향상된 서비스를 위하여 개인정보 처리를 타인에게 위탁할 수 있습니다.이 경우 회사는 사전에 다음 각 호의 사항 모두를 이용자에게 미리 알리고 동의를 받습니다. 다음 각 호의 어느 하나의 사항이 변경되는 경우에도 같습니다.</li>
          <ul>
            <li>개인정보 처리위탁을 받는 자</li>
            <li>개인정보 처리위탁을 하는 업무의 내용</li>
          </ul>
          <li>회사는 정보통신서비스의 제공에 관한 계약을 이행하고 이용자 편의 증진 등을 위하여 필요한 경우 개인정보처리방침에 따라 가항 각 호의 사항을 공개함으로써 고지절차와 동의절차를 거치지 아니하고 개인정보 처리를 타인에게 위탁할 수 있습니다.</li>
        </ol>
        <h4>5. 정보주체 권리·의무 및 그 행사방법에 관한 사항</h4>
        <ol>
          <li>정보주체(만 14세 미만인 경우에는 법정대리인이 권리를 행사할 수 있음)는 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</li>
          <ul>
            <li>개인정보 열람요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제요구</li>
            <li>처리정지 요구</li>
          </ul>

          <li>제1항에 따른 권리 행사는 개인정보보호법 시행규칙 별지 제8호 서식에 따라 작성 후 서면, 전자우편 등을 통하여 할 수 있으며, 기관은 이에 대해 지체 없이 조치하겠습니다.</li>
          <li>정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.</li>
          <li>제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 할 수 있습니다. 이 경우 개인정보보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출해야 합니다.</li>
          <li>개인정보 열람 및 처리정지 요구는 개인정보보호법 제35조 제5항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.</li>
          <li>개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.</li>
          <li>정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</li>
          <ul>
            <li>본인을 확인할 수 있는 신분증(주민등록증, 운전면허증, 여권 등)을 제시</li>
            <li>대리인의 경우 대리인을 확인할 수 있는 신분증과 위임장 제시</li>
            <li><a href="http://www.law.go.kr/lsBylInfoPLinkR.do?lsiSeq=137979&lsNm=%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%20%EB%B3%B4%ED%98%B8%EB%B2%95%20%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99&bylNo=0008&bylBrNo=00&bylCls=BF&bylEfYd=" target="_blank"><u>[개인정보보호법 시행규칙 별지 제8호] 개인정보(열람, 정정·삭제, 처리정지) 요구서</u></a></li>
            <li><a href="http://www.law.go.kr/lsBylInfoPLinkR.do?lsiSeq=137979&lsNm=%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%20%EB%B3%B4%ED%98%B8%EB%B2%95%20%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99&bylNo=0011&bylBrNo=00&bylCls=BF&bylEfYd=" target="_blank"><u>[개인정보보호법 시행규칙 별지 제11호] 위임장</u></a></li>
          </ul>
        </ol>
        <h4>6. 처리하는 개인정보의 항목</h4>
        <p>Factory Hunt는 다음의 개인정보 항목을 처리하고 있습니다.</p>
        <table class="table table-bordered">
          <caption>개인정보 항목 처리</caption>
          <thead>
          <tr>
            <th></th>
            <th>개인정보파일의 명칭</th>
            <th>개인정보파일에 기록되는 개인정보의 항목 (필수)</th>
            <th>개인정보파일에 기록되는 개인정보의 항목 (선택 사항)</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>바이어 정보</td>
            <td>이메일, 비밀번호, 회사명</td>
            <td>회사정보(웹사이트, 사업자등록번호, 사원수, 설립일, 전화번호, 팩스, 연혁, 주소), 성명, 성별, 타이틀, 휴대폰번호</td>
          </tr>
          <tr>
            <td>2</td>
            <td>제조업체 정보</td>
            <td>이메일, 비밀번호, 회사명</td>
            <td>회사정보(웹사이트, 사업자등록번호, 사원수, 설립일, 전화번호, 팩스, 연혁, 주소), 성명, 성별, 타이틀, 휴대폰번호</td>
          </tr>
          </tbody>
        </table>
        <h4>7. 개인정보 파기 절차 및 방법</h4>
        <p>Factory Hunt는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체 없이 해당 개인정보를 파기합니다. 다만, 다른 법률에 따라 보존하여야하는 경우에는 그러하지 않습니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.</p>
        <ol>
          <li>파기절차: 불필요한 개인정보 및 개인정보파일은 개인정보책임자의 책임 하에 내부방침 절차에 따라 다음과 같이 처리하고 있습니다.</li>
          <ul>
            <li>개인정보의 파기: 보유기간이 경과한 개인정보는 종료일로부터 지체 없이 파기합니다.</li>
            <li>개인정보파일의 파기: 개인정보파일의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보파일이 불필요하게 되었을 때에는 개인정보의
              처리가 불필요한 것으로 인정되는 날로부터 지체 없이 그 개인정보파일을 파기합니다.</li>
          </ul>
          <li>파기방법</li>
          <ul>
            <li>전자적 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</li>
            <li>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
          </ul>
        </ol>
        <h4>8. 개인정보의 안전성 확보 조치</h4>
        <p>Factory Hunt는 「개인정보보호법」 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적, 관리적, 물리적 조치를 하고 있습니다.</p>
        <ol>
          <li>개인정보 취급 담당자의 최소화 및 교육
            개인정보를 취급하는 담당자를 지정하고 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다.</li>
          <li>개인정보에 대한 접근 제한
            개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한
            조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.</li>
          <li>접속기록의 보관
            개인정보처리시스템에 접속한 기록(웹 로그, 요약정보 등)을 최소 6개월 이상 보관·관리하고 있습니다.</li>
          <li>개인정보의 암호화
            이용자의 개인정보는 암호화 되어 저장 및 관리되고 있습니다. 또한 중요한 데이터는 저장 및 전송 시 암호화하여 사용하는 등의
            별도 보안기능을 사용하고 있습니다.  </li>
          <li>보안프로그램 설치 및 주기적 점검·갱신
            Factory Hunt는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적으로
            갱신·점검하고 있습니다.</li>
          <li>비인가자에 대한 출입 통제
            개인정보를 보관하고 있는 개인정보시스템의 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.</li>
        </ol>
        <h4>9. 개인정보보호 책임자 연락처</h4>
        <ul>
          <li>Factory Hunt 개인정보관리 책임자</li>
          <ul>
            <li>직책 : CTO(최고기술경영자)</li>
            <li>성명 : 김동현</li>
            <li>이메일 : info@factoryhunt.com</li>
          </ul>
        </ul>
        <h4>10. 개인정보 열람청구</h4>
        <ol>
          <li>정보주체는 개인정보-보호법 제35조에 따른 개인정보의 열람 청구를 아래의 연락처를 통해 할 수 있습니다. Factory Hunt는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.
            <ul>
              <li>Factory Hunt 개인정보관리 책임자</li>
              <ul>
                <li>직책 : CTO(최고기술경영자)</li>
                <li>성명 : 김동현</li>
                <li>이메일 : info@factoryhunt.com</li>
              </ul>
            </ul>
          <li>정보주체는 제1항의 열람청구 접수·처리부서 이외에, 행정자치부의 ‘개인정보보호 종합지원 포털’ 웹사이트(<a href="http://www.privacy.go.kr" target="_blank">www.privacy.go.kr</a>)를 통하여서도 개인정보 열람청구를 할 수 있습니다.
            ▶ 행정자치부 개인정보보호 종합지원 포털 → 개인정보 민원 → 개인정보 열람등 요구 (공공아이핀을 통한 실명인증 필요) </li>
        </ol>
        <h4>11. 권익침해 구제방법</h4>
        <p>정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의할 수 있습니다. 아래의 기관은 Factory Hunt와 별개의 기관으로서, Factory Hunt의 자체적인 개인정보 불만처리, 피해구제 결과에 만족하지 못하거나 보다 자세한 도움이 필요하시면 문의하여 주시기 바랍니다.</p>
        <ul>
          <li>개인정보 침해신고센터 (한국인터넷진흥원 운영)</li>
          <ul>
            <li>소관업무 : 개인정보 침해사실 신고, 상담 신청</li>
            <li>홈페이지 : <a href="http://privacy.kisa.or.kr" target="_blank">privacy.kisa.or.kr</a></li>
            <li>전화 : (국번없이) 118</li>
            <li>주소 : (138-950) 서울시 송파구 중대로 135 한국인터넷진흥원 개인정보침해신고센터</li>
          </ul>
          <li>개인정보 분쟁조정위원회 (한국인터넷진흥원 운영)</li>
          <ul>
            <li>소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)</li>
            <li>홈페이지 : <a href="http://www.kopico.go.kr" target="_blank">www.kopico.go.kr</a></li>
            <li>전화 : 1833-6972</li>
            <li>주소 : (03171) 서울시 종로구 세종대로 209 정부서울청사 4층 개인정보 분쟁조정위원회</li>
          </ul>
          <li>대검찰청 사이버범죄수사단 : 1301 (<a href="http://www.spo.go.kr" target="_blank">www.spo.go.kr</a>, <a href="mailto:cid@spo.go.kr" target="_blank">cid@spo.go.kr</a>)</li>
          <li>경찰청 사이버테러대응센터 : 182 (<a href="http://cyberbureau.police.go.kr" target="_blank">cyberbureau.police.go.kr</a>)</li>
        </ul>
        <p>또한, 개인정보의 열람, 정정·삭제, 처리정지 등에 대한 정보주체자의 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익을 침해 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.</p>
        <ul>
          <li>중앙행정심판위원회(<a href="http://www.simpan.go.kr" target="_blank">www.simpan.go.kr</a>)의 전화번호 안내 참조</li>
        </ul>
        <h4>12. 개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항</h4>
        <p>Factory Hunt는 이용자에 대한 정보를 저장하고 수시로 찾아내는 '쿠키(COOKIE, 인터넷 접속정보 파일 등 개인정보 자동수집 장치)'를 사용할 수 있습니다. 쿠키란 기관의 웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에 보내는 소량의 정보로서 이용자의 컴퓨터의 하드디스크에 저장되기도 합니다. 이용자가 웹사이트에 접속을 하면 기관의 컴퓨터는 이용자의 브라우저에 있는 쿠키의 내용을 읽고, 이용자의 추가정보를 귀하의 컴퓨터에서 찾아 접속에 따른 성명 등의 추가 입력 없이 서비스를 제공할 수 있습니다. 쿠키는 이용자의 컴퓨터는 식별하지만 귀하를 개인적으로 식별하지는 않습니다. 또한, 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 이용자는 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키 설치를 거부할 경우 웹 사용이 불편해지며 로그인이 필요한 일부 서비스 이용에 어려움이 있을 수 있습니다.</p>
        <p>설정 방법의 예</p>
        <ul>
          <li>인터넷 익스플로러(Internet Explorer)의 경우 : 웹 브라우저 상단의 도구 메뉴 ▷ 인터넷 옵션 ▷ 개인정보 ▷ 쿠키 차단 수준 설정</li>
          <li>크롬(Chrome)의 경우 : 웹 브라우저 우측의 설정 메뉴 ▷ 화면 하단의 고급 설정 표시 ▷ 개인정보의 콘텐츠 설정 버튼 ▷ 쿠키 차단
            수준 설정</li>
        </ul>
      </div>
    </div>`
      }
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index";

  .body-container {
    h3 {
      padding-bottom: 10px;
    }
    h4 {
      padding-top: 15px;
      padding-bottom: 3px;
    }
    caption {
      font-style: italic;
    }
  }
</style>
