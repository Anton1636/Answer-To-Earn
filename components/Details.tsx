import { truncate } from '@/utils/helper'
import { QuestionProp, RootState } from '@/utils/interfaces'
import React from 'react'
import { BsCalendar3 } from 'react-icons/bs'
import { FaEthereum } from 'react-icons/fa'
import Identicon from 'react-identicons'
import Moment from 'react-moment'
import { useSelector } from 'react-redux'
import QuestionAction from './QuestionActions'
import { Tags, TagsSm } from './Tags'

const Details: React.FC<{ question: QuestionProp | null }> = ({ question }) => {
  const { wallet } = useSelector((states: RootState) => states.globalStates)
  if (!question) return <p>Loading...</p>

  return (
    <>
      <div className="flex flex-col mt-10 space-y-5 text-[#BBBBBB]">
        <div className="flex justify-between items-center">
          <h4
            className="inline-block from-blue-700 to-pink-700 leading-[30px]
            bg-gradient-to-r bg-clip-text text-transparent text-[36.65px]"
          >
            {question.title}
          </h4>
          {wallet && <QuestionAction />}
        </div>
        <p className="text-[14px] leading-[21px]">{question.description}</p>

        <div className="sm:hidden flex justify-start items-center space-x-2 text-[#56617B]">
          <BsCalendar3 size={20} />
          <span>
            Asked <Moment fromNow>{question.created}</Moment>
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center flex-wrap text-[14px]">
            <div className="hidden sm:flex justify-center items-center space-x-2 text-[#56617B] mr-3">
              <BsCalendar3 size={20} />
              <span>
                Asked <Moment fromNow>{question.created}</Moment>
              </span>
            </div>

            <div className="flex items-center space-x-3 flex-wrap">
              {question.paidout ? (
                <div
                  className="flex space-x-1 border border-green-400 h-[32px] w-[90px]
                    justify-center items-center rounded-md text-green-400 cursor-pointer"
                >
                  <FaEthereum className="w-[10px] h-[15px]" />
                  <p>{question.prize} paid</p>
                </div>
              ) : (
                <div
                  className="flex space-x-1 border border-pink-500 h-[32px] w-[90px]
                    justify-center items-center rounded-md text-pink-500 cursor-pointer"
                >
                  <FaEthereum className="w-[10px] h-[15px]" />
                  <p>{question.prize} prize</p>
                </div>
              )}

              <Tags tags={question.tags} />
              <TagsSm tags={question.tags} />
            </div>
          </div>
          <div className="space-x-2 text-xs hidden sm:flex items-center">
            <Identicon
              className="h-6 rounded-full bg-slate-600"
              size={30}
              string={question.owner}
            />
            <p>{truncate({ text: question.owner, startChars: 4, endChars: 4, maxLength: 11 })}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3 sm:hidden mt-5 text-[#BBBBBB]">
        <div className=" space-x-2 text-xs flex items-center">
          <Identicon className="h-6 rounded-full bg-slate-600" size={30} string={question.owner} />
          <p>{truncate({ text: question.owner, startChars: 4, endChars: 4, maxLength: 11 })}</p>
        </div>
      </div>
    </>
  )
}

export default Details
