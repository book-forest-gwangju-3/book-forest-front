import { useParams } from "react-router-dom";
import { PiUserCircleLight } from "react-icons/pi";
import { PiHeartStraight } from "react-icons/pi";
import { PiHeartStraightFill } from "react-icons/pi";
import { GoComment } from "react-icons/go";
import Button from "../components/Button";

const content = `어린 왕자는 생텍쥐페리의 가장 유명한 작품 중 하나로, 단순한 동화의
              형식을 띠고 있지만 심오한 철학적 메시지를 담고 있습니다. 이 책은
              어린 왕자가 사막에 불시착한 조종사에게 자신의 모험과 만남을
              이야기하는 형식으로 진행됩니다. 어린 왕자는 자신의 소행성
              B-612에서 아름다운 장미와 함께 살았습니다. 하지만 장미의 요구와
              자만심에 지친 어린 왕자는 소행성을 떠나 여러 행성을 여행하며
              다양한 사람들을 만납니다. 이 과정에서 그는 권위적인 왕, 허영심
              많은 사람, 술꾼, 사업가, 등 다양한 어른들을 만납니다. 각 행성에서
              만나는 인물들은 모두 어른들이 가지는 부정적인 면을 상징하고
              있으며, 어린 왕자는 이들을 통해 어른들의 세계를 이해하려고 합니다.
              어린 왕자가 만난 사람들 중 특히 인상 깊은 인물은 지구에서 만난
              여우입니다. 여우는 어린 왕자에게 길들여짐의 의미를 가르쳐줍니다.
              길들여진다는 것은 관계를 맺고, 서로에게 특별한 존재가 되는 것을
              의미합니다. 이 과정에서 어린 왕자는 자신이 떠나온 장미를 진정으로
              사랑하고 있음을 깨닫게 됩니다. 여우의 가르침은 중요한 것은 눈에
              보이지 않는다는 중요한 메시지를 전합니다. 이는 인간 관계에서의
              진정한 가치를 깨닫게 해줍니다. 책의 마지막 부분에서 어린 왕자는
              조종사에게 자신의 떠나는 결정을 이야기합니다. 그는 자신의 별로
              돌아가기 위해 뱀에게 물려 죽음을 맞이합니다. 이 장면은 슬프지만,
              어린 왕자가 진정으로 행복한 곳으로 돌아가는 것을 암시합니다.
              조종사는 어린 왕자의 죽음 후에도 그의 기억을 간직하며, 독자들에게
              어린 왕자가 여전히 어딘가에서 그를 기다리고 있다는 희망을
              전합니다. 어린 왕자는 단순한 동화이지만, 인간 관계의 본질, 사랑,
              책임, 성숙에 대한 깊은 통찰을 담고 있습니다. 어린 왕자는 순수함과
              호기심을 상징하며, 어른들의 세계가 잃어버린 중요한 가치들을
              상기시킵니다. 이 책은 모든 연령대의 독자들에게 감동을 주며, 삶의
              중요한 교훈을 전해줍니다. 생텍쥐페리는 이 작품을 통해 인간의
              본질과 삶의 의미에 대해 깊이 생각하게 만듭니다. 어린 왕자는 우리의
              마음 속에 영원히 남아, 순수함과 사랑의 가치를 일깨워주는 소중한
              책입니다.`;

const ReportDetail = () => {
  const { id } = useParams();
  // params에 해당하는 독후감 데이터 가져오는 로직 추가
  // 로그인시 댓글 작성가능, 비로그인시 불가능
  // 로그인유저 === 작성자면 수정, 삭제 버튼
  // 시간 변환하는 함수 추가
  // 좋아요 버튼 토글로 아이콘 바뀌게
  // 댓글 수 렌더링
  // 자기가 쓴 댓글에는 수정, 삭제 버튼
  return (
    <main className="h-full w-full flex items-center justify-center">
      <div className="border bg-white mt-6 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="gap-3.5 flex items-center">
            <PiUserCircleLight className="object-cover w-10 h-10" />
            <div className="flex flex-col">
              <b className="capitalize">김가람</b>
              <p className="text-gray-400 text-xs">24.06.23 11:23</p>
            </div>
          </div>
        </div>
        <h1 className="whitespace-pre-wrap mt-7 text-2xl">어린 왕자를 읽고</h1>
        <div className="mt-5 flex gap-2 justify-center border-b pb-4 flex-wrap">
          <p>{content}</p>
        </div>
        <div className="h-16 border-b flex items-center justify-around">
          <div className="flex items-center gap-3">
            <GoComment className="text-xl" />
            <div className="text-sm">10 Comments</div>
          </div>
          <div className="flex items-center gap-3">
            <PiHeartStraight className="text-xl" />
            <div className="text-sm">5 Likes</div>
          </div>
        </div>
        <div className="pt-4">
          <div className="mb-4 flex">
            <PiUserCircleLight className="w-10 h-10" />
            <div className="ml-2 flex flex-col">
              <b className="capitalize">최재원</b>
              <time dateTime="06-08-21" className="text-gray-400 text-xs">
                24.06.23 12:04
              </time>
              <p className="whitespace-pre-wrap mt-2">잘 읽었습니다.</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="ml-2 flex flex-col flex-grow mr-3">
            <input
              type="text"
              className="bg-gray-100 rounded-xl w-full px-4 py-2 text-gray-800 placeholder-gray-500"
              placeholder="댓글을 작성해주세요"
            />
          </div>
          <Button
            text={"작성"}
            color={"bg-pink-500 text-white h-10 text-base"}
          />
        </div>
      </div>
    </main>
  );
};

export default ReportDetail;
